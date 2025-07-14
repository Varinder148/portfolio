import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { THEME } from "@/utils/constants";
import clsx from "clsx";
import { useViewport } from "@/Providers/ViewportProvider";

const CustomMousePointer: React.FC = () => {
  const pointerRef = useRef<HTMLDivElement>(null);
  const secondaryPointerRef = useRef<HTMLDivElement>(null);
  const { isTouchDevice } = useViewport();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isTouchDevice) return;
    let animationRef: gsap.core.Tween | null = null;
    let secondaryAnimationRef: gsap.core.Tween | null = null;

    const onMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      if (
        clientX >= 0 &&
        clientX <= innerWidth &&
        clientY >= 0 &&
        clientY <= innerHeight
      ) {
        const pointerRect = pointerRef.current?.getBoundingClientRect();
        const secondaryPointerRect =
          secondaryPointerRef.current?.getBoundingClientRect();
        if (pointerRect && secondaryPointerRect) {
          const pointerOffsetX =
            (secondaryPointerRect.width - pointerRect.width) / 2;
          const pointerOffsetY =
            (secondaryPointerRect.height - pointerRect.height) / 2;
          animationRef?.kill();
          secondaryAnimationRef?.kill();
          animationRef = gsap.to(pointerRef.current, {
            x: clientX,
            y: clientY,
            scale: isHovered ? 3 : 1,
            backgroundColor: isHovered ? THEME.IVORY : THEME.RED,
            display: "block",
            duration: 0.1,
            ease: "power3.out",
          });
          secondaryAnimationRef = gsap.to(secondaryPointerRef.current, {
            x: clientX - pointerOffsetX,
            y: clientY - pointerOffsetY,
            display: "block",
            duration: 0.7,
            ease: "power3.out",
          });
        }
      } else {
        animationRef?.kill();
        secondaryAnimationRef?.kill();
        animationRef = gsap.to(pointerRef.current, { display: "none" });
        secondaryAnimationRef = gsap.to(secondaryPointerRef.current, {
          display: "none",
        });
      }
    };

    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);
    const clickableElements = document.querySelectorAll(
      'a, button:not([disabled]), [role="button"]',
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
      animationRef?.kill();
      secondaryAnimationRef?.kill();
    };
  }, [isHovered, isTouchDevice]);

  if (isTouchDevice) return null;
  return (
    <>
      <div
        ref={pointerRef}
        className={`fixed top-0 left-0 w-5 h-5 opacity-50 rounded-full pointer-events-none z-[1000] hidden ${isHovered ? "bg-theme-red" : "bg-theme-white"}`}
      />
      <div
        ref={secondaryPointerRef}
        className={clsx(
          `fixed top-0 left-0 w-15 h-15 border-2 border-theme-gray rounded-full pointer-events-none z-[1000] hidden `,
          { invisible: isHovered },
        )}
      />
    </>
  );
};

export default CustomMousePointer;
