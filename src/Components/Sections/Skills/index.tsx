import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import decomp from "poly-decomp";
import "pathseg";

const Skills: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine>();
  const renderRef = useRef<Matter.Render>();
  const runnerRef = useRef<Matter.Runner>();

  useEffect(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const {
      Engine,
      Render,
      Runner,
      Composites,
      Common,
      Composite,
      Query,
      Bodies,
      Body,
      Vertices,
      Svg,
    } = Matter;

    // provide concave decomposition support
    Common.setDecomp(decomp);

    // create engine
    const engine = Engine.create();
    engineRef.current = engine;
    const { world } = engine;

    // create renderer with updated options
    const render = Render.create({
      element: canvasRef.current!,
      engine: engine,
      options: {
        width: viewportWidth,
        height: viewportHeight,
        wireframes: false,
        background: "transparent",
        pixelRatio: window.devicePixelRatio,
      },
    });
    renderRef.current = render;

    Render.run(render);

    // create runner
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // add bodies
    const select = (root: Document, selector: string) => {
      return Array.prototype.slice.call(root.querySelectorAll(selector));
    };

    const loadSvg = async (url: string) => {
      try {
        const response = await fetch(url);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "image/svg+xml");
        const paths = select(doc, "path");

        const vertexSets = paths.map((path) => {
          // Get the total length of the path
          const length = path.getTotalLength();
          const sampleLength = 40;
          const points = [];

          // Sample points along the path
          for (let i = 0; i <= length; i += sampleLength) {
            const point = path.getPointAtLength(i);
            points.push({ x: point.x * 0.8, y: point.y * 0.8 });
          }

          return points;
        });

        return vertexSets;
      } catch (error) {
        console.error("SVG loading error:", error);
        throw error;
      }
    };

    // Add ground while waiting for SVG
    const ground = Bodies.rectangle(
      viewportWidth / 2,
      viewportHeight - 10,
      viewportWidth,
      20,
      {
        isStatic: true,
        render: { fillStyle: "#000000" },
      }
    );
    Composite.add(world, ground);

    // Load and process the SVG
    loadSvg("/brain.svg")
      .then((vertexSets) => {
        // Get SVG bounds

        const bounds = {
          min: { x: Infinity, y: Infinity },
          max: { x: -Infinity, y: -Infinity },
        };

        vertexSets.forEach((vertices) => {
          vertices.forEach((vertex) => {
            bounds.min.x = Math.min(bounds.min.x, vertex.x);
            bounds.min.y = Math.min(bounds.min.y, vertex.y);
            bounds.max.x = Math.max(bounds.max.x, vertex.x);
            bounds.max.y = Math.max(bounds.max.y, vertex.y);
          });
        });

        const terrain = Bodies.fromVertices(
          viewportWidth / 2, // Center horizontally based on viewport
          viewportHeight / 2, // Center vertically
          vertexSets,
          {
            isStatic: true,
            render: {
              strokeStyle: "#F6F7EB",
              lineWidth: 0.1,
            },
          },
          true
        );

        Composite.add(world, terrain);

        const bodyOptions = {
          frictionAir: 0.001,
          friction: 0.1,
          restitution: 0.8,
          density: 0.001,
          render: {
            fillStyle: "#4285f4",
          },
        };

        // Generate balls within SVG bounds
        const svgCenter = {
          x: viewportWidth / 2,
          y: viewportHeight / 2,
        };

        const ballArea = {
          x: svgCenter.x - (bounds.max.x - bounds.min.x) * 0.3,
          y: svgCenter.y - (bounds.max.y - bounds.min.y) * 0.3,
          cols: 5,
          rows: 3,
          spacing: 30,
        };

        Composite.add(
          world,
          Composites.stack(
            ballArea.x,
            ballArea.y,
            ballArea.cols,
            ballArea.rows,
            ballArea.spacing,
            ballArea.spacing,
            (x, y) => {
              if (Query.point([terrain], { x, y }).length === 0) {
                return Bodies.circle(x, y, 10, bodyOptions);
              }
            }
          )
        );
      })
      .catch((error) => {
        console.error("Failed to process SVG:", error);
      });

    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: viewportWidth, y: viewportHeight },
    });

    // cleanup
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      engine.events = {};
      render.canvas.remove();
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        margin: "0 auto", // Center the canvas
      }}
    />
  );
};

export default Skills;
