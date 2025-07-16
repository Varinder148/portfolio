import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { THEME } from "@/utils/constants";
import clsx from "clsx";
import { useViewport } from "@/Providers/ViewportProvider";

import { throttle } from "lodash";

const CustomMousePointer: React.FC = () => {
  const pointerRef = useRef<HTMLDivElement>(null);
  const secondaryPointerRef = useRef<HTMLDivElement>(null);
  const { isTouchDevice } = useViewport();
  const [isHovered, setIsHovered] = useState(false);

  // Memoized pointer update logic
  const updatePointer = useCallback(
    (clientX: number, clientY: number, isInWindow: boolean) => {
      const pointerRect = pointerRef.current?.getBoundingClientRect();
      const secondaryPointerRect =
        secondaryPointerRef.current?.getBoundingClientRect();
      if (isInWindow && pointerRect && secondaryPointerRect) {
        const pointerOffsetX =
          (secondaryPointerRect.width - pointerRect.width) / 2;
        const pointerOffsetY =
          (secondaryPointerRect.height - pointerRect.height) / 2;
        // Kill previous tweens before starting new ones
        gsap.killTweensOf(pointerRef.current);
        gsap.killTweensOf(secondaryPointerRef.current);
        gsap.to(pointerRef.current, {
          x: clientX,
          y: clientY,
          scale: isHovered ? 3 : 1,
          backgroundColor: isHovered ? THEME.IVORY : THEME.RED,
          display: "block",
          duration: 0.1,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(secondaryPointerRef.current, {
          x: clientX - pointerOffsetX,
          y: clientY - pointerOffsetY,
          display: "block",
          duration: 0.7,
          ease: "power3.out",
          overwrite: "auto",
        });
      } else {
        gsap.killTweensOf(pointerRef.current);
        gsap.killTweensOf(secondaryPointerRef.current);
        gsap.to(pointerRef.current, { display: "none", overwrite: "auto" });
        gsap.to(secondaryPointerRef.current, {
          display: "none",
          overwrite: "auto",
        });
      }
    },
    [isHovered],
  );

  useEffect(() => {
    if (isTouchDevice) return;

    // Throttle mousemove to 16ms (60fps)
    const throttledMouseMove = throttle((event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      const isInWindow =
        clientX >= 0 &&
        clientX <= innerWidth &&
        clientY >= 0 &&
        clientY <= innerHeight;
      updatePointer(clientX, clientY, isInWindow);
    }, 16);

    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);
    const clickableElements = document.querySelectorAll(
      'a, button:not([disabled]), [role="button"]',
    );
    clickableElements.forEach((element) => {
      element.addEventListener("mouseenter", onMouseEnter);
      element.addEventListener("mouseleave", onMouseLeave);
    });
    window.addEventListener("mousemove", throttledMouseMove);
    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
      throttledMouseMove.cancel();
      clickableElements.forEach((element) => {
        element.removeEventListener("mouseenter", onMouseEnter);
        element.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, [isHovered, isTouchDevice, updatePointer]);

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
