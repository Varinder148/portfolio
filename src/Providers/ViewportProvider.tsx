import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Define the context and its types
interface ViewportContextType {
  isMobile: boolean;
  isTouchDevice: boolean;
  viewportWidth: number;
  viewportHeight: number;
}

const ViewportContext = createContext<ViewportContextType | undefined>(
  undefined,
);

const ViewportProvider = ({ children }: { children: ReactNode }) => {
  const [viewportWidth, setViewportWidth] = useState<number>(0);
  const [viewportHeight, setViewportHeight] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  // Handle resizing and viewport changes
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
      setIsMobile(window.innerWidth < 768); // Define mobile based on width
    };

    // Check if the device is a touch device
    const checkTouchDevice = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        //@ts-ignore
        navigator.msMaxTouchPoints > 0
      );
    };

    setIsTouchDevice(checkTouchDevice());

    // Add resize listener on mount
    window.addEventListener("resize", handleResize);

    // Call handleResize to set the initial viewport
    handleResize();

    // Clean up the event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ViewportContext.Provider
      value={{ isMobile, isTouchDevice, viewportWidth, viewportHeight }}
    >
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
