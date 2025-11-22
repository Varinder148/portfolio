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
        // Use transform-based animation (x/y + xPercent/yPercent) to avoid
        // layout thrashing caused by animating `left`/`top`.
        gsap.to(pointerRef.current, {
          x: clientX,
          y: clientY,
          xPercent: -50,
          yPercent: -50,
          scale: isHoveredRef.current ? 3 : 1,
          backgroundColor: isHoveredRef.current ? THEME.IVORY : THEME.RED,
          autoAlpha: isHoveredRef.current ? 0.5 : 1,
          duration: 0.1,
          ease: "power3.out",
          overwrite: "auto",
          force3D: true,
        });

        gsap.to(secondaryPointerRef.current, {
          x: clientX,
          y: clientY,
          xPercent: -50,
          yPercent: -50,
          autoAlpha: isHoveredRef.current ? 0 : 1,
          duration: 0.4,
          ease: "power3.out",
          overwrite: "auto",
          force3D: true,
        });
      } else {
        gsap.to(pointerRef.current, { autoAlpha: 0, overwrite: "auto" });
        gsap.to(secondaryPointerRef.current, {
          autoAlpha: 0,
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

    // Initialize pointers off-screen and hidden so transforms work predictably
    if (pointerRef.current) {
      gsap.set(pointerRef.current, { x: -9999, y: -9999, autoAlpha: 0 });
    }
    if (secondaryPointerRef.current) {
      gsap.set(secondaryPointerRef.current, {
        x: -9999,
        y: -9999,
        autoAlpha: 0,
      });
    }

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

  useEffect(() => {
    if (isTouchDevice) return;
    // When hover state changes, hide/show the outer ring and set inner ring opacity
    if (pointerRef.current) {
      gsap.to(pointerRef.current, {
        opacity: isHovered ? 0.5 : 1,
        duration: 0.15,
        overwrite: "auto",
      });
    }
    if (secondaryPointerRef.current) {
      gsap.to(secondaryPointerRef.current, {
        autoAlpha: isHovered ? 0 : 1,
        duration: 0.2,
        overwrite: "auto",
      });
    }
  }, [isHovered, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={pointerRef}
        style={{ willChange: "transform" }}
        className={`fixed left-0 top-0 w-5 h-5 rounded-full pointer-events-none z-[1000] ${
          isHovered ? "bg-theme-white" : "bg-theme-red"
        }`}
      />
      <div
        ref={secondaryPointerRef}
        style={{ willChange: "transform" }}
        className={clsx(
          `fixed left-0 top-0 w-15 h-15 border-2 border-theme-gray rounded-full pointer-events-none z-[1000] `,
          { invisible: isHovered },
        )}
      />
    </>
  );
};

export default CustomMousePointer;
