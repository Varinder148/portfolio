import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomMousePointer: React.FC = () => {
  const pointerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      if (
        clientX >= 0 &&
        clientX <= innerWidth &&
        clientY >= 0 &&
        clientY <= innerHeight
      ) {
        gsap.to(pointerRef.current, {
          x: clientX,
          y: clientY,
          display: "block",
          duration: 0.3,
          ease: "power3.out",
        });
      } else {
        gsap.to(pointerRef.current, {
          display: "none",
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);
  return (
    <div
      ref={pointerRef}
      className="fixed top-0 left-0 w-5 h-5 bg-theme-red opacity-50 rounded-full pointer-events-none z-1000 hidden"
    ></div>
  );
};

export default CustomMousePointer;
