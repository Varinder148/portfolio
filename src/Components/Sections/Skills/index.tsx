import React, { useEffect, useState } from "react";
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
import { requestDeviceOrientationPermission, isIOS } from "@/utils/iosUtils";
// import simplify from "simplify-js";

// Performance monitoring utility
const usePerformanceMonitor = () => {
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        if (fps < 30) {
          console.warn(`Low FPS detected: ${fps}`);
        }
        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
  }, []);
};

// Register polygon decomposition once at module initialization
if (Common && typeof Common.setDecomp === "function") {
  Common.setDecomp(decomp);
}

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

  // Persist renderer, runner and mouse constraint across resizes to avoid recreating them
  const renderRef = React.useRef<any | null>(null);
  const runnerRef = React.useRef<any | null>(null);
  const mouseConstraintRef = React.useRef<any | null>(null);

  // Unmount cleanup: stop runner/render and remove canvas once when component unmounts
  React.useEffect(() => {
    return () => {
      const render = renderRef.current;
      const runner = runnerRef.current;
      const mouseConstraint = mouseConstraintRef.current;
      const engine = engineRef.current;
      try {
        if (mouseConstraint && engine) {
          Composite.remove(engine.world, mouseConstraint);
          mouseConstraintRef.current = null;
        }
        if (runner) {
          Runner.stop(runner);
          runnerRef.current = null;
        }
        if (render) {
          Render.stop(render);
          if (render.canvas && typeof render.canvas.remove === "function") {
            render.canvas.remove();
          }
          renderRef.current = null;
        }
      } catch (e) {
        console.log(e);
      }
    };
  }, []);

  // --- Engine instance (stable) ---
  const engineRef = React.useRef<ReturnType<typeof Engine.create> | null>(null);
  if (!engineRef.current) {
    engineRef.current = Engine.create();
  }

  // --- World setup effect ---
  React.useEffect(() => {
    const engine = engineRef.current!;
    // Clear previous world bodies (keep engine instance stable)
    Composite.clear(engine.world, false);
    Engine.clear(engine);

    // Ensure we only remove unrelated canvases (not the renderer we may be reusing)
    const prevCanvas = canvasRef.current?.querySelector("canvas");
    if (prevCanvas && prevCanvas !== renderRef.current?.canvas)
      prevCanvas.remove();

    // Setup or reuse renderer
    let render = renderRef.current;
    if (!render) {
      render = Render.create({
        element: canvasRef.current!,
        engine: engine,
        options: {
          width: dimensions.width,
          height: dimensions.height,
          wireframes: false,
          background: "transparent",
          pixelRatio: Math.min(window.devicePixelRatio, 1.0), // Reduced from 1.5
          showDebug: false,
          showBounds: false,
          showVelocity: false,
        },
      });
      Render.run(render);
      renderRef.current = render;
    } else {
      // Update size for existing renderer
      render.options.width = dimensions.width;
      render.options.height = dimensions.height;
      try {
        if (render.canvas) {
          render.canvas.width = Math.floor(
            dimensions.width * Math.min(window.devicePixelRatio, 1),
          );
          render.canvas.height = Math.floor(
            dimensions.height * Math.min(window.devicePixelRatio, 1),
          );
        }
      } catch (e) {
        console.log(e);
      }
    }

    // Setup or reuse runner
    let runner = runnerRef.current;
    if (!runner) {
      runner = Runner.create();
      Runner.run(runner, engine);
      runnerRef.current = runner;
    }

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
    // Terrain bounds computed from scaled vertices (already transformed to viewport coords)
    const bounds = {
      min: { x: Infinity, y: Infinity },
      max: { x: -Infinity, y: -Infinity },
    };
    scaledVertices.forEach((vertices: { x: number; y: number }[]) => {
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
    // Remove previous mouse constraint if present to avoid duplicates
    if (mouseConstraintRef.current) {
      try {
        Composite.remove(engine.world, mouseConstraintRef.current);
      } catch (e) {
        console.log(e);
      }
      mouseConstraintRef.current = null;
    }
    Composite.add(engine.world, mouseConstraint);
    mouseConstraintRef.current = mouseConstraint;
    render.mouse = mouse;
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: dimensions.width, y: dimensions.height },
    });
    // No per-resize cleanup here. Full cleanup is handled on unmount.
    return undefined;
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
    let permissionRequested = false;
    let orientationEventFired = false;

    function updateGravity(event: DeviceOrientationEvent) {
      orientationEventFired = true;
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

    // Try to add event listener first (works for most browsers)
    window.addEventListener("deviceorientation", updateGravity, {
      passive: true,
    });

    // Check if device orientation event fires naturally
    const checkOrientationPermission = () => {
      if (!orientationEventFired && !permissionRequested && isIOS()) {
        permissionRequested = true;
        // Only request permission if the event hasn't fired after a delay
        setTimeout(async () => {
          if (!orientationEventFired) {
            const hasPermission = await requestDeviceOrientationPermission();
            if (hasPermission) {
              console.log("Device orientation permission granted");
            } else {
              console.log("Device orientation permission denied");
            }
          }
        }, 2000); // Wait 2 seconds to see if event fires naturally
      }
    };

    // Check permission after a delay
    setTimeout(checkOrientationPermission, 1000);

    return () => {
      window.removeEventListener("deviceorientation", updateGravity);
    };
  }, [device.isTouchDevice]);

  return { canvasRef, ...device };
}

const Skills: React.FC = () => {
  const { canvasRef, isTouchDevice } = useSkillsPhysics();
  const [orientationStatus, setOrientationStatus] = useState<
    "waiting" | "working" | "permission-needed"
  >("waiting");

  // Add performance monitoring
  usePerformanceMonitor();

  useEffect(() => {
    if (isTouchDevice && isIOS()) {
      // Check if device orientation is working after a delay
      const checkOrientation = setTimeout(() => {
        setOrientationStatus("working");
      }, 3000);

      // Listen for device orientation events to update status
      const handleOrientation = () => {
        setOrientationStatus("working");
      };

      window.addEventListener("deviceorientation", handleOrientation, {
        passive: true,
      });

      return () => {
        clearTimeout(checkOrientation);
        window.removeEventListener("deviceorientation", handleOrientation);
        console.log("unmounted");
      };
    }
  }, [isTouchDevice]);

  const getInstructionText = () => {
    if (!isTouchDevice) {
      return "Try dragging the skills";
    }

    if (isIOS()) {
      switch (orientationStatus) {
        case "waiting":
          return "Tilting your device...";
        case "working":
          return "Try tilting your device";
        case "permission-needed":
          return "Allow motion access to tilt";
        default:
          return "Try tilting your device";
      }
    }

    return "Try tilting your device";
  };

  return (
    <>
      <div className="text-2xl relative top-0 w-full text-center">
        {getInstructionText()}
      </div>
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
