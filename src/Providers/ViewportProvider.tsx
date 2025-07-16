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
  // SSR safety: initialize with window values if available
  const getInitialWidth = () =>
    typeof window !== "undefined" ? window.innerWidth : 0;
  const getInitialHeight = () =>
    typeof window !== "undefined" ? window.innerHeight : 0;
  const [viewportWidth, setViewportWidth] = useState<number>(getInitialWidth());
  const [viewportHeight, setViewportHeight] =
    useState<number>(getInitialHeight());
  const [isMobile, setIsMobile] = useState<boolean>(getInitialWidth() < 768);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let resizeTimeout: NodeJS.Timeout | null = null;

    const checkTouchDevice = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        //@ts-ignore
        navigator.msMaxTouchPoints > 0
      );
    };

    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setViewportWidth(window.innerWidth);
        setViewportHeight(window.innerHeight);
        setIsMobile(window.innerWidth < 768);
        setIsTouchDevice(checkTouchDevice());
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    // Set initial values
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
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
