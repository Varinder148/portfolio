import React, { useEffect, useRef, useMemo, useState } from "react";
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
import { useViewport } from "@/Providers/ViewportProvider";
// import simplify from "simplify-js";

function getScaleFactor(viewportWidth: number) {
  const maxWidth = 1200;
  const minWidth = 100;

  if (viewportWidth >= maxWidth) {
    return 1.3;
  }

  const scaleFactor =
    1.8 - (1.0 * (viewportWidth - minWidth)) / (maxWidth - minWidth);

  return scaleFactor;
}

const getScaledVertices = (
  vertexSets: any[],
  viewportWidth: number,
  viewportHeight: number,
) => {
  // Find bounding box of all vertices
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  vertexSets.forEach((vertexSet) => {
    vertexSet.forEach((vertex: { x: number; y: number }) => {
      minX = Math.min(minX, vertex.x);
      minY = Math.min(minY, vertex.y);
      maxX = Math.max(maxX, vertex.x);
      maxY = Math.max(maxY, vertex.y);
    });
  });

  // Calculate scale factors to fit SVG into viewport (with some margin)
  const margin = 20; // reduce margin for bigger shape
  const scaleMultiplier = getScaleFactor(viewportWidth); // increase for bigger shape
  const scaleX = (viewportWidth - margin * 2) / (maxX - minX);
  const scaleY = (viewportHeight - margin * 2) / (maxY - minY);
  const scale = Math.min(scaleX, scaleY) * scaleMultiplier; // uniform scaling, bigger

  // Center the shape in the viewport
  const offsetX = (viewportWidth - (maxX - minX) * scale) / 2;
  const offsetY = (viewportHeight - (maxY - minY) * scale) / 2;

  const scaledVertices: any[][] = [];
  vertexSets.forEach((vertexSet) => {
    let scaledVertexSetRow: any[] = [];
    vertexSet.forEach((vertex: { x: number; y: number }) => {
      const scaledVertex = {
        x: (vertex.x - minX) * scale + offsetX,
        y: (vertex.y - minY) * scale + offsetY,
      };
      scaledVertexSetRow.push(scaledVertex);
    });
    scaledVertices.push(scaledVertexSetRow);
    scaledVertexSetRow = [];
  });
  return scaledVertices;
};

// function to recalculate vertexes
// const createVertexSets = () => {
//   var select = function (root, selector) {
//     return Array.prototype.slice.call(root.querySelectorAll(selector));
//   };
//   var loadSvg = function (url) {
//     return fetch(url)
//       .then(function (response) {
//         return response.text();
//       })
//       .then(function (raw) {
//         return new window.DOMParser().parseFromString(raw, "image/svg+xml");
//       });
//   };
//   loadSvg("./brain.svg").then(function (root) {
//     var paths = select(root, "path");

//     var vertexSets = paths.map(function (path) {
//       return Svg.pathToVertices(path, 10000);
//     });

//     // Apply simplify-js to each vertex set with a tolerance value (e.g., 5)
//     const tolerance = 10;
//     const simplifiedSets = vertexSets.map((set) =>
//       simplify(set, tolerance, true)
//     );
//     console.log(simplifiedSets);
//   });
// };

const Skills: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner>(null);

  const { viewportWidth, viewportHeight, isMobile, isTouchDevice } =
    useViewport();

  // Debounced resize state
  const [dimensions, setDimensions] = useState({
    width: viewportWidth,
    height: viewportHeight,
  });
  useEffect(() => {
    // createVertexSets();

    let resizeTimeout: NodeJS.Timeout | null = null;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      }, 200);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, []);

  // Memoize scaledVertices
  const scaledVertices = useMemo(
    () => getScaledVertices(vertexSets, dimensions.width, dimensions.height),
    [vertexSets, dimensions.width, dimensions.height],
  );

  useEffect(() => {
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
    (renderRef as React.MutableRefObject<Matter.Render | null>).current =
      render;

    Render.run(render);

    const runner = Runner.create();
    (runnerRef as React.MutableRefObject<Matter.Runner>).current = runner;
    Runner.run(runner, engine);

    if (typeof window !== "undefined" && isTouchDevice) {
      const updateGravity = function (event: any) {
        const orientation =
          typeof window.orientation !== "undefined" ? window.orientation : 0;
        const gravity = engine.gravity;
        if (orientation === 0) {
          gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
          gravity.y = Common.clamp(event.beta, -90, 90) / 90;
        } else if (orientation === 180) {
          gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
          gravity.y = Common.clamp(-event.beta, -90, 90) / 90;
        } else if (orientation === 90) {
          gravity.x = Common.clamp(event.beta, -90, 90) / 90;
          gravity.y = Common.clamp(-event.gamma, -90, 90) / 90;
        } else if (orientation === -90) {
          gravity.x = Common.clamp(-event.beta, -90, 90) / 90;
          gravity.y = Common.clamp(event.gamma, -90, 90) / 90;
        }
      };
      window.addEventListener("deviceorientation", updateGravity, {
        passive: true,
      });
    }

    const ground = Bodies.rectangle(
      viewportWidth / 2,
      viewportHeight - 10,
      viewportWidth,
      10,
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
          fillStyle: "#222831",
          strokeStyle: "#FFFFFF",
          lineWidth: 1,
        },
      },
      true,
    );

    if (!isMobile) Composite.add(world, terrain);

    // Generate balls within SVG bounds
    const svgCenter = {
      x: viewportWidth / 2,
      y: viewportHeight / 2,
    };

    const ballArea = {
      x: svgCenter.x - (bounds.max.x - bounds.min.x) * 0.3,
      y: svgCenter.y - (bounds.max.y - bounds.min.y) * 0.3,
      cols: 4,
      rows: 5,
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
        (x: any, y: any, i: any, j: any, k: any, index: number) => {
          // console.log(row, col, row * 1 + col, o, i, n);
          // if (Query.point([terrain], { x, y }).length === 0) {
          const bodyOptions = {
            frictionAir: 0.01,
            friction: 0.1,
            restitution: 0.8,
            density: 1,
            render: {
              fillStyle: "#4285f4",
              sprite: {
                texture: getSvgTexture(SKILLS[index]),
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

    engine.world.gravity.y = 0.5;

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

    if (isTouchDevice) {
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
      // Clear Matter.js world and engine for memory management
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [
    dimensions.width,
    dimensions.height,
    isMobile,
    isTouchDevice,
    scaledVertices,
  ]);

  return (
    <>
      {isTouchDevice && (
        <div className="text-2xl relative  top-0 w-full text-center">
          Try tilting your device
        </div>
      )}
      {!isTouchDevice && (
        <div className="text-2xl  relative  top-0 w-full text-center">
          Try dragging the skills
        </div>
      )}

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

export default React.memo(Skills);
