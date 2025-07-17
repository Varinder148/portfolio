import React, { useEffect, useRef, useMemo, useState } from "react";
import {
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
    return 1.2;
  }

  const scaleFactor =
    1.8 - (1.0 * (viewportWidth - minWidth)) / (maxWidth - minWidth);

  return scaleFactor;
}

const getScaledVertices = (
  vertexSets: { x: number; y: number }[][],
  viewportWidth: number,
  viewportHeight: number,
): { x: number; y: number }[][] => {
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

  const scaledVertices: { x: number; y: number }[][] = [];
  vertexSets.forEach((vertexSet) => {
    let scaledVertexSetRow: { x: number; y: number }[] = [];
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
//     const tolerance = 15;
//     const simplifiedSets = vertexSets.map((set) =>
//       simplify(set, tolerance, true)
//     );
//     console.log(simplifiedSets);
//   });
// };

// 1. Extract config constants
const SKILLS_CONFIG = {
  ballRadius: 40,
  ballSpacing: 2,
  ballCols: 4,
  ballRows: 5,
  gravity: 0.5,
  frictionAir: 0.01,
  friction: 0.1,
  restitution: 0.8,
  margin: 20,
  scaleFactor: getScaleFactor,
};

// 2. Custom hook for physics logic
function useSkillsPhysics({
  canvasRef,
  scaledVertices,
  vertexSets,
  viewportWidth,
  viewportHeight,
  isMobile,
  isTouchDevice,
  skills,
}: {
  canvasRef: React.RefObject<HTMLDivElement>;
  scaledVertices: { x: number; y: number }[][];
  vertexSets: { x: number; y: number }[][];
  viewportWidth: number;
  viewportHeight: number;
  isMobile: boolean;
  isTouchDevice: boolean;
  skills: string[];
}) {
  // createVertexSets();

  React.useEffect(() => {
    Common.setDecomp(decomp);
    const engine = Engine.create();
    const { world } = engine;
    const render = Render.create({
      element: canvasRef.current!,
      engine: engine,
      options: {
        width: viewportWidth,
        height: viewportHeight,
        wireframes: false,
        background: "transparent",
        pixelRatio: Math.min(window.devicePixelRatio, 1.5), // Lower pixel ratio for performance
      },
    });
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    let updateGravity: ((event: DeviceOrientationEvent) => void) | undefined;
    let lastGravityUpdate = 0;
    const GRAVITY_THROTTLE_MS = 50;
    if (typeof window !== "undefined" && isTouchDevice) {
      updateGravity = function (event: DeviceOrientationEvent) {
        const now = Date.now();
        if (now - lastGravityUpdate < GRAVITY_THROTTLE_MS) return;
        lastGravityUpdate = now;
        const orientation =
          typeof window.orientation !== "undefined" ? window.orientation : 0;
        const gravity = engine.gravity;
        if (orientation === 0) {
          gravity.x = Common.clamp(event.gamma ?? 0, -90, 90) / 90;
          gravity.y = Common.clamp(event.beta ?? 0, -90, 90) / 90;
        } else if (orientation === 180) {
          gravity.x = Common.clamp(event.gamma ?? 0, -90, 90) / 90;
          gravity.y = Common.clamp(-(event.beta ?? 0), -90, 90) / 90;
        } else if (orientation === 90) {
          gravity.x = Common.clamp(event.beta ?? 0, -90, 90) / 90;
          gravity.y = Common.clamp(-(event.gamma ?? 0), -90, 90) / 90;
        } else if (orientation === -90) {
          gravity.x = Common.clamp(-(event.beta ?? 0), -90, 90) / 90;
          gravity.y = Common.clamp(event.gamma ?? 0, -90, 90) / 90;
        }
      };
      window.addEventListener("deviceorientation", updateGravity, {
        passive: true,
      });
    }

    // Walls
    const ground = Bodies.rectangle(
      viewportWidth / 2,
      viewportHeight - 10,
      viewportWidth,
      10,
      { isStatic: true, render: { fillStyle: "#0F0F0F" } },
    );
    const leftWall = Bodies.rectangle(
      0,
      viewportHeight / 2,
      10,
      viewportHeight + 40,
      { isStatic: true, render: { fillStyle: "#0F0F0F" } },
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
      { isStatic: true, render: { fillStyle: "#0F0F0F" } },
    );
    Composite.add(world, [ground, leftWall, rightWall, roof]);

    // Terrain
    const bounds = {
      min: { x: Infinity, y: Infinity },
      max: { x: -Infinity, y: -Infinity },
    };
    vertexSets.forEach((vertices: { x: number; y: number }[]) => {
      vertices.forEach((vertex: { x: number; y: number }) => {
        bounds.min.x = Math.min(bounds.min.x, vertex.x);
        bounds.min.y = Math.min(bounds.min.y, vertex.y);
        bounds.max.x = Math.max(bounds.max.x, vertex.x);
        bounds.max.y = Math.max(bounds.max.y, vertex.y);
      });
    });
    const terrain = Bodies.fromVertices(
      viewportWidth / 2,
      viewportHeight / 2,
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

    // Balls
    const svgCenter = { x: viewportWidth / 2, y: viewportHeight / 2 };
    const ballArea = {
      x: svgCenter.x - (bounds.max.x - bounds.min.x) * 0.3,
      y: svgCenter.y - (bounds.max.y - bounds.min.y) * 0.3,
      cols: SKILLS_CONFIG.ballCols,
      rows: SKILLS_CONFIG.ballRows,
      spacing: SKILLS_CONFIG.ballSpacing,
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
        (
          x: number,
          y: number,
          i: number,
          j: number,
          k: number,
          index: number,
        ) => {
          const bodyOptions = {
            frictionAir: SKILLS_CONFIG.frictionAir,
            friction: SKILLS_CONFIG.friction,
            restitution: SKILLS_CONFIG.restitution,
            density: 1,
            render: {
              fillStyle: "#4285f4",
              sprite: {
                texture: getSvgTexture(skills[index]),
                xScale: 1,
                yScale: 1,
              },
            },
          };
          return Bodies.circle(x, y, SKILLS_CONFIG.ballRadius, bodyOptions);
        },
      ),
    );
    engine.world.gravity.y = SKILLS_CONFIG.gravity;

    // Mouse control
    const mouse = Mouse.create(canvasRef.current as HTMLElement);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
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
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: viewportWidth, y: viewportHeight },
    });
    // Cleanup
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      render.canvas.remove();
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      // Remove deviceorientation event listener if it was added
      if (typeof window !== "undefined" && isTouchDevice && updateGravity) {
        window.removeEventListener("deviceorientation", updateGravity);
      }
    };
  }, [
    canvasRef,
    scaledVertices,
    vertexSets,
    viewportWidth,
    viewportHeight,
    isMobile,
    isTouchDevice,
    skills,
  ]);
}

const Skills: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { viewportWidth, viewportHeight, isMobile, isTouchDevice } =
    useViewport();
  // Debounced resize state
  const [dimensions, setDimensions] = useState({
    width: viewportWidth,
    height: viewportHeight,
  });
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout | null = null;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      }, 300); // More aggressive debounce
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
    [dimensions.width, dimensions.height],
  );

  // Use custom hook for physics
  useSkillsPhysics({
    canvasRef,
    scaledVertices,
    vertexSets,
    viewportWidth: dimensions.width,
    viewportHeight: dimensions.height,
    isMobile,
    isTouchDevice,
    skills: SKILLS,
  });
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
