import React, { useEffect, useRef } from "react";
import Matter, {
  Mouse,
  MouseConstraint,
  Engine,
  Render,
  Runner,
  Composites,
  Common,
  Composite,
  Bodies,
} from "matter-js";

// @ts-ignore
import decomp from "poly-decomp";
import "pathseg";
import { vertexSets } from "./vertexSets";
import { getSvgTexture, SKILLS } from "./utils";
import {
  getViewportWidth,
  isTouchDevice,
  getViewportHeight,
} from "@/utils/screen";

function getScaleFactor(viewportWidth: number) {
  const maxWidth = 1200;
  const minWidth = 600;

  if (viewportWidth >= maxWidth) {
    return 1.5;
  }

  if (viewportWidth <= minWidth) {
    return 0.5;
  }

  const scaleFactor =
    1.5 - (1.0 * (viewportWidth - minWidth)) / (maxWidth - minWidth);

  return scaleFactor;
}

const getScaledVertices = (vertexSets: any[]) => {
  const scaleFactor = getScaleFactor(getViewportWidth());
  console.log(scaleFactor, getViewportWidth());

  const scaledVertices: any[][] = [];
  vertexSets.forEach((vertexSet) => {
    let scaledVertexSetRow: any[] = [];
    vertexSet.forEach((vertex: { x: number; y: number }) => {
      const scaledVertex = { x: 0, y: 0 };
      scaledVertex.x = vertex.x * scaleFactor;
      scaledVertex.y = vertex.y * scaleFactor;
      scaledVertexSetRow.push(scaledVertex);
    });
    scaledVertices.push(scaledVertexSetRow);
    scaledVertexSetRow = [];
  });
  return scaledVertices;
};

const Skills: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine>(null);
  const renderRef = useRef<Matter.Render>(null);
  const runnerRef = useRef<Matter.Runner>(null);

  useEffect(() => {
    const viewportWidth = getViewportWidth();
    const viewportHeight = getViewportHeight();

    Common.setDecomp(decomp);

    const engine = Engine.create();
    engineRef.current = engine;
    const { world } = engine;

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

    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // add bodies
    // const select = (root: Document, selector: string) => {
    //   return Array.prototype.slice.call(root.querySelectorAll(selector));
    // };

    // const loadSvg = async (url: string) => {
    //   try {
    //     const response = await fetch(url);
    //     const text = await response.text();
    //     const parser = new DOMParser();
    //     const doc = parser.parseFromString(text, "image/svg+xml");
    //     const paths = select(doc, "path");

    //     const vertexSets = paths.map((path) => {
    //       // Get the total length of the path
    //       const length = path.getTotalLength();
    //       const sampleLength = 40;
    //       const points = [];

    //       // Sample points along the path
    //       for (let i = 0; i <= length; i += sampleLength) {
    //         const point = path.getPointAtLength(i);
    //         points.push({ x: point.x * 0.8, y: point.y * 0.8 });
    //       }

    //       console.log(points);
    //       return points;
    //     });

    //     return vertexSets;
    //   } catch (error) {
    //     console.error("SVG loading error:", error);
    //     throw error;
    //   }
    // };

    const ground = Bodies.rectangle(
      viewportWidth / 2,
      viewportHeight - 10,
      viewportWidth,
      100,
      {
        isStatic: true,
        render: { fillStyle: "#0F0F0F" },
      },
    );

    const leftWall = Bodies.rectangle(
      0,
      viewportHeight / 2,
      10,
      viewportHeight + 40,
      {
        isStatic: true,
        render: { fillStyle: "#0F0F0F" },
      },
    );

    const roof = Bodies.rectangle(viewportWidth / 2, 0, viewportWidth, 10, {
      isStatic: true,
      render: { fillStyle: "#0F0F0F" },
    });

    const rightWall = Bodies.rectangle(
      viewportWidth - 20,
      viewportHeight / 2,
      10,
      viewportHeight + 40,
      {
        isStatic: true,
        render: { fillStyle: "#0F0F0F" },
      },
    );

    Composite.add(world, [ground, leftWall, rightWall, roof]);

    const bounds = {
      min: { x: Infinity, y: Infinity },
      max: { x: -Infinity, y: -Infinity },
    };

    const scaledVertices = getScaledVertices(vertexSets);
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
      scaledVertices,
      {
        isStatic: true,
        render: {
          strokeStyle: "#F6F7EB",
          lineWidth: 1,
        },
      },
      true,
    );

    Composite.add(world, terrain);

    // Generate balls within SVG bounds
    const svgCenter = {
      x: viewportWidth / 2,
      y: viewportHeight / 2,
    };

    const ballArea = {
      x: svgCenter.x - (bounds.max.x - bounds.min.x) * 0.3,
      y: svgCenter.y - (bounds.max.y - bounds.min.y) * 0.3,
      cols: 8,
      rows: 2,
      spacing: 2,
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
        (x: any, y: any, col: any, row: any) => {
          // if (Query.point([terrain], { x, y }).length === 0) {
          const bodyOptions = {
            frictionAir: 0.001,
            friction: 0.1,
            restitution: 0.8,
            density: 0.001,
            render: {
              fillStyle: "#4285f4",
              sprite: {
                texture: getSvgTexture(SKILLS[row * 1 + col]),
                xScale: 1,
                yScale: 1,
              },
            },
          };

          return Bodies.circle(x, y, 40, bodyOptions);
          // }
        },
      ),
    );

    // add mouse control
    const mouse = Mouse.create(canvasRef.current as HTMLElement);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });
    mouseConstraint.mouse.element.removeEventListener(
      "wheel",
      //@ts-ignore
      mouseConstraint.mouse.mousewheel,
    );

    if (isTouchDevice()) {
      mouseConstraint.mouse.element.removeEventListener(
        "touchmove",
        //@ts-ignore
        mouseConstraint.mouse.mousemove,
      );

      mouseConstraint.mouse.element.removeEventListener(
        "touchstart",
        //@ts-ignore
        mouseConstraint.mouse.mousedown,
      );
      mouseConstraint.mouse.element.removeEventListener(
        "touchend",
        //@ts-ignore
        mouseConstraint.mouse.mouseup,
      );
    }

    Composite.add(world, mouseConstraint);

    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: viewportWidth, y: viewportHeight },
    });

    // cleanup
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      render.canvas.remove();
    };
  }, []);

  return (
    <>
      <div
        ref={canvasRef}
        style={{
          width: "100vw",
          height: "100vh",
          position: "relative",
          margin: "0 auto",
        }}
      />
    </>
  );
};

export default Skills;
