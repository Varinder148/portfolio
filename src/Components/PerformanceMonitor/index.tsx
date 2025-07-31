import React, { useEffect, useState } from "react";

interface PerformanceMetrics {
  fps: number;
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
  };
}

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({ fps: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrameId: number;

    const measurePerformance = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));

        const newMetrics: PerformanceMetrics = { fps };

        // Add memory info if available
        if ("memory" in performance) {
          const memory = (performance as any).memory;
          newMetrics.memory = {
            usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
            totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1024 / 1024), // MB
          };
        }

        setMetrics(newMetrics);
        frameCount = 0;
        lastTime = currentTime;
      }

      animationFrameId = requestAnimationFrame(measurePerformance);
    };

    animationFrameId = requestAnimationFrame(measurePerformance);

    // Toggle visibility with Ctrl+Shift+P
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "P") {
        setIsVisible((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  if (!isVisible) return null;

  const getFpsColor = (fps: number) => {
    if (fps >= 50) return "text-green-500";
    if (fps >= 30) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="fixed top-4 right-4 bg-black bg-opacity-80 text-white p-3 rounded-lg text-sm font-mono z-[9999]">
      <div className="mb-2">
        <span className="text-gray-400">FPS: </span>
        <span className={getFpsColor(metrics.fps)}>{metrics.fps}</span>
      </div>
      {metrics.memory && (
        <div className="text-xs text-gray-400">
          <div>
            Memory: {metrics.memory.usedJSHeapSize}MB /{" "}
            {metrics.memory.totalJSHeapSize}MB
          </div>
        </div>
      )}
      <div className="text-xs text-gray-500 mt-1">
        Press Ctrl+Shift+P to toggle
      </div>
    </div>
  );
};

export default PerformanceMonitor;
