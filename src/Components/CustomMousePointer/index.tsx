import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { THEME } from "@/utils/constants";
import clsx from "clsx";
import { useViewport } from "@/Providers/ViewportProvider";

import { throttle } from "lodash";

const CLICKABLE_SELECTOR = 'a, button:not([disabled]), [role="button"]';

const CustomMousePointer: React.FC = () => {
  const pointerRef = useRef<HTMLDivElement>(null);
  const secondaryPointerRef = useRef<HTMLDivElement>(null);
  const { isTouchDevice } = useViewport();
  const [isHovered, setIsHoveredState] = useState(false);

  // Mirror hover state in a ref so updatePointer can remain stable
  const isHoveredRef = useRef(false);
  const setIsHovered = useCallback((v: boolean) => {
    isHoveredRef.current = v;
    setIsHoveredState(v);
  }, []);

  // Stable throttled mouse handler ref
  const throttledMouseMoveRef = useRef<
    ((clientX: number, clientY: number, isInWindow: boolean) => void) | null
  >(null);

  // Stable pointer updater that reads latest hover state from ref
  const updatePointer = useCallback(
    (clientX: number, clientY: number, isInWindow: boolean) => {
      if (!pointerRef.current || !secondaryPointerRef.current) return;

      if (isInWindow) {
        // Rely on overwrite:auto instead of killing tweens every frame
        gsap.to(pointerRef.current, {
          left: clientX,
          top: clientY,
          x: "-50%",
          y: "-50%",
          scale: isHoveredRef.current ? 3 : 1,
          backgroundColor: isHoveredRef.current ? THEME.IVORY : THEME.RED,
          display: "block",
          duration: 0.1,
          ease: "power3.out",
          overwrite: "auto",
          force3D: true,
        });

        gsap.to(secondaryPointerRef.current, {
          left: clientX,
          top: clientY,
          x: "-50%",
          y: "-50%",
          display: "block",
          duration: 0.4,
          ease: "power3.out",
          overwrite: "auto",
          force3D: true,
        });
      } else {
        gsap.to(pointerRef.current, { display: "none", overwrite: "auto" });
        gsap.to(secondaryPointerRef.current, {
          display: "none",
          overwrite: "auto",
        });
      }
    },
    [],
  );

  useEffect(() => {
    if (isTouchDevice) return;

    // Create a single throttled wrapper that calls our stable updatePointer
    throttledMouseMoveRef.current = throttle(
      (clientX: number, clientY: number, isInWindow: boolean) => {
        updatePointer(clientX, clientY, isInWindow);
      },
      32,
    );

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      const isInWindow =
        clientX >= 0 &&
        clientX <= innerWidth &&
        clientY >= 0 &&
        clientY <= innerHeight;
      throttledMouseMoveRef.current?.(clientX, clientY, isInWindow);
    };

    // Use event delegation on document to detect hover on clickable elements instead
    const handleDocMouseOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      if (target.closest && target.closest(CLICKABLE_SELECTOR)) {
        setIsHovered(true);
      }
    };

    const handleDocMouseOut = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const related = (e as any).relatedTarget as Element | null;
      if (!target) return;
      const leftClickable =
        target.closest && target.closest(CLICKABLE_SELECTOR);
      // If we left a clickable element and the relatedTarget isn't inside a clickable, clear hover
      if (leftClickable) {
        if (
          !related ||
          !related.closest ||
          !related.closest(CLICKABLE_SELECTOR)
        ) {
          setIsHovered(false);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleDocMouseOver);
    document.addEventListener("mouseout", handleDocMouseOut);

    return () => {
      // Kill any running tweens once on unmount
      gsap.killTweensOf(pointerRef.current);
      gsap.killTweensOf(secondaryPointerRef.current);

      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleDocMouseOver);
      document.removeEventListener("mouseout", handleDocMouseOut);

      if (
        throttledMouseMoveRef.current &&
        (throttledMouseMoveRef.current as any).cancel
      ) {
        (throttledMouseMoveRef.current as any).cancel();
        throttledMouseMoveRef.current = null;
      }
    };
  }, [isTouchDevice, updatePointer]);

  if (isTouchDevice) return null;
  return (
    <>
      <div
        ref={pointerRef}
        className={`fixed w-5 h-5 opacity-50 rounded-full pointer-events-none z-[1000] hidden ${
          isHovered ? "bg-theme-white" : "bg-theme-red"
        }`}
      />
      <div
        ref={secondaryPointerRef}
        className={clsx(
          `fixed w-15 h-15 border-2 border-theme-gray rounded-full pointer-events-none z-[1000] hidden `,
          { invisible: isHovered },
        )}
      />
    </>
  );
};

export default CustomMousePointer;
