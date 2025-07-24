import React, { useEffect } from "react";
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
function useSkillsPhysics() {
  const canvasRef = React.useRef<HTMLDivElement>(null);
  // Device detection
  const getIsTouchDevice = () => {
    if (typeof window === "undefined") return false;
    return (
      "ontouchstart" in window || (navigator && navigator.maxTouchPoints > 0)
    );
  };
  const getIsMobile = () => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= 768;
  };
  const [device, setDevice] = React.useState({
    isTouchDevice: getIsTouchDevice(),
    isMobile: getIsMobile(),
  });
  // Debounced resize state
  const [dimensions, setDimensions] = React.useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });
  React.useEffect(() => {
    let resizeTimeout: NodeJS.Timeout | null = null;
    let lastWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
    let lastHeight = typeof window !== "undefined" ? window.innerHeight : 800;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const isMobile = window.innerWidth <= 768;
        const widthChanged = window.innerWidth !== lastWidth;
        const heightChanged = window.innerHeight !== lastHeight;
        if (
          (isMobile && widthChanged) ||
          (!isMobile && (widthChanged || heightChanged))
        ) {
          setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
          });
          lastWidth = window.innerWidth;
          lastHeight = window.innerHeight;
        }
        setDevice({
          isTouchDevice: getIsTouchDevice(),
          isMobile: isMobile,
        });
      }, 300);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, []);
  // Memoize scaledVertices
  const scaledVertices = React.useMemo(
    () => getScaledVertices(vertexSets, dimensions.width, dimensions.height),
    [dimensions.width, dimensions.height],
  );

  // --- Engine instance (stable) ---
  const engineRef = React.useRef<ReturnType<typeof Engine.create> | null>(null);
  if (!engineRef.current) {
    engineRef.current = Engine.create();
  }

  // --- World setup effect ---
  React.useEffect(() => {
    const engine = engineRef.current!;
    Common.setDecomp(decomp);
    // Clear previous world
    Composite.clear(engine.world, false);
    Engine.clear(engine);
    // Remove any previous renderers
    const prevCanvas = canvasRef.current?.querySelector("canvas");
    if (prevCanvas) prevCanvas.remove();
    // Setup renderer
    const render = Render.create({
      element: canvasRef.current!,
      engine: engine,
      options: {
        width: dimensions.width,
        height: dimensions.height,
        wireframes: false,
        background: "transparent",
        pixelRatio: Math.min(window.devicePixelRatio, 1.5),
      },
    });
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);
    // Walls
    const ground = Bodies.rectangle(
      dimensions.width / 2,
      dimensions.height - 10,
      dimensions.width,
      10,
      { isStatic: true, render: { fillStyle: "#0F0F0F" } },
    );
    const leftWall = Bodies.rectangle(
      0,
      dimensions.height / 2,
      10,
      dimensions.height + 40,
      { isStatic: true, render: { fillStyle: "#0F0F0F" } },
    );
    const roof = Bodies.rectangle(
      dimensions.width / 2,
      0,
      dimensions.width,
      10,
      {
        isStatic: true,
        render: { fillStyle: "#0F0F0F" },
      },
    );
    const rightWall = Bodies.rectangle(
      dimensions.width - 20,
      dimensions.height / 2,
      10,
      dimensions.height + 40,
      { isStatic: true, render: { fillStyle: "#0F0F0F" } },
    );
    Composite.add(engine.world, [ground, leftWall, rightWall, roof]);
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
      dimensions.width / 2,
      dimensions.height / 2,
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
    if (!device.isMobile) Composite.add(engine.world, terrain);
    // Balls
    const svgCenter = { x: dimensions.width / 2, y: dimensions.height / 2 };
    const ballArea = {
      x: svgCenter.x - (bounds.max.x - bounds.min.x) * 0.3,
      y: svgCenter.y - (bounds.max.y - bounds.min.y) * 0.3,
      cols: SKILLS_CONFIG.ballCols,
      rows: SKILLS_CONFIG.ballRows,
      spacing: SKILLS_CONFIG.ballSpacing,
    };
    Composite.add(
      engine.world,
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
                texture: getSvgTexture(SKILLS[index]),
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
    if (device.isTouchDevice) {
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
    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: dimensions.width, y: dimensions.height },
    });
    // Cleanup
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      render.canvas.remove();
      // Do not clear engineRef here, keep it stable
    };
  }, [
    dimensions.width,
    dimensions.height,
    device.isMobile,
    device.isTouchDevice,
    scaledVertices,
  ]);

  // --- Gravity (device orientation) effect ---
  React.useEffect(() => {
    const engine = engineRef.current!;
    if (typeof window === "undefined" || !device.isTouchDevice) return;
    let lastGravityUpdate = 0;
    const GRAVITY_THROTTLE_MS = 50;
    function updateGravity(event: DeviceOrientationEvent) {
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
    }
    window.addEventListener("deviceorientation", updateGravity, {
      passive: true,
    });
    return () => {
      window.removeEventListener("deviceorientation", updateGravity);
    };
  }, [device.isTouchDevice]);

  return { canvasRef, ...device };
}

const Skills: React.FC = () => {
  const { canvasRef, isTouchDevice } = useSkillsPhysics();

  useEffect(() => {
    return () => console.log("unmounted");
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
