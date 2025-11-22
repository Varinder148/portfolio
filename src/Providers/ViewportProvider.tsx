"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

// Define the context and its types
interface ViewportContextType {
  isMobile: boolean;
  isTouchDevice: boolean;
  viewportWidth: number;
  viewportHeight: number;
}

const ViewportContext = createContext<ViewportContextType>({
  isMobile: false,
  isTouchDevice: false,
  viewportWidth: 1024,
  viewportHeight: 768,
});

const ViewportProvider = ({ children }: { children: ReactNode }) => {
  // Start with default desktop values for SSR
  const [viewportWidth, setViewportWidth] = useState<number>(1024);
  const [viewportHeight, setViewportHeight] = useState<number>(768);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useLayoutEffect(() => {
    const checkTouchDevice = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        //@ts-ignore
        navigator.msMaxTouchPoints > 0
      );
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setViewportWidth(width);
      setViewportHeight(height);
      setIsMobile(width < 768);
      setIsTouchDevice(checkTouchDevice());
    };

    // Initial measurement
    handleResize();

    // Setup resize listener
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ViewportContext.Provider
      value={{
        isMobile,
        isTouchDevice,
        viewportWidth,
        viewportHeight,
      }}
    >
      {/* Render children immediately but update values after mount */}
      {children}
    </ViewportContext.Provider>
  );
};

// Custom hook to use the ViewportContext
const useViewport = (): ViewportContextType => {
  const context = useContext(ViewportContext);
  if (!context) {
    throw new Error("useViewport must be used within a ViewportProvider");
  }
  return context;
};

export { ViewportProvider, useViewport };
