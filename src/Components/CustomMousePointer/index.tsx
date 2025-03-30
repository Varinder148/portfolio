import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { THEME } from "@/utils/constants";

const CustomMousePointer: React.FC = () => {
  const pointerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<GSAPTween | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if device is desktop
    const checkDevice = () => {
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isWideScreen = window.innerWidth >= 1024;
      setIsDesktop(!isTouchDevice && isWideScreen);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const onMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      if (animationRef.current) {
        animationRef.current.kill();
      }

      if (
        clientX >= 0 &&
        clientX <= innerWidth &&
        clientY >= 0 &&
        clientY <= innerHeight
      ) {
        animationRef.current = gsap.to(pointerRef.current, {
          x: clientX,
          y: clientY,
          scale: isHovered ? 3 : 1,
          backgroundColor: isHovered ? THEME.IVORY : THEME.RED,
          display: "block",
          duration: 0.3,
          ease: "power3.out",
        });
      } else {
        animationRef.current = gsap.to(pointerRef.current, {
          display: "none",
        });
      }
    };

    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);

    const clickableElements = document.querySelectorAll(
      'a, button, [role="button"]'
    );
    clickableElements.forEach((element) => {
      element.addEventListener("mouseenter", onMouseEnter);
      element.addEventListener("mouseleave", onMouseLeave);
    });

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      clickableElements.forEach((element) => {
        element.removeEventListener("mouseenter", onMouseEnter);
        element.removeEventListener("mouseleave", onMouseLeave);
      });
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [isHovered, isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      ref={pointerRef}
      className={`fixed top-0 left-0 w-5 h-5 opacity-50 rounded-full pointer-events-none z-1000 hidden ${
        isHovered ? "bg-theme-red" : "bg-theme-white"
      }`}
    ></div>
  );
};

export default CustomMousePointer;
