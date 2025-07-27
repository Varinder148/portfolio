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

  // Refs to track cleanup functions
  const throttledMouseMoveRef = useRef<ReturnType<typeof throttle> | null>(
    null,
  );
  const mutationObserverRef = useRef<MutationObserver | null>(null);
  const eventListenersRef = useRef<
    Map<Element, { enter: () => void; leave: () => void }>
  >(new Map());

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

  // Function to add event listeners to clickable elements
  const addEventListenersToElement = useCallback((element: Element) => {
    if (eventListenersRef.current.has(element)) return; // Already has listeners

    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);

    element.addEventListener("mouseenter", onMouseEnter);
    element.addEventListener("mouseleave", onMouseLeave);

    // Store references for cleanup
    eventListenersRef.current.set(element, {
      enter: onMouseEnter,
      leave: onMouseLeave,
    });
  }, []);

  // Function to remove event listeners from an element
  const removeEventListenersFromElement = useCallback((element: Element) => {
    const listeners = eventListenersRef.current.get(element);
    if (listeners) {
      element.removeEventListener("mouseenter", listeners.enter);
      element.removeEventListener("mouseleave", listeners.leave);
      eventListenersRef.current.delete(element);
    }
  }, []);

  // Function to add listeners to all current clickable elements
  const addListenersToAllClickableElements = useCallback(() => {
    const clickableElements = document.querySelectorAll(
      'a, button:not([disabled]), [role="button"]',
    );
    clickableElements.forEach(addEventListenersToElement);
  }, [addEventListenersToElement]);

  // Function to remove all event listeners
  const removeAllEventListeners = useCallback(() => {
    eventListenersRef.current.forEach((listeners, element) => {
      element.removeEventListener("mouseenter", listeners.enter);
      element.removeEventListener("mouseleave", listeners.leave);
    });
    eventListenersRef.current.clear();
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    // Throttle mousemove to 16ms (60fps)
    throttledMouseMoveRef.current = throttle((event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      const isInWindow =
        clientX >= 0 &&
        clientX <= innerWidth &&
        clientY >= 0 &&
        clientY <= innerHeight;
      updatePointer(clientX, clientY, isInWindow);
    }, 16);

    // Add listeners to existing elements
    addListenersToAllClickableElements();

    // Set up MutationObserver to watch for new elements
    mutationObserverRef.current = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            // Check if the added element is clickable
            if (element.matches('a, button:not([disabled]), [role="button"]')) {
              addEventListenersToElement(element);
            }
            // Check children of added element
            element
              .querySelectorAll('a, button:not([disabled]), [role="button"]')
              .forEach(addEventListenersToElement);
          }
        });

        mutation.removedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            // Remove listeners from removed element
            if (element.matches('a, button:not([disabled]), [role="button"]')) {
              removeEventListenersFromElement(element);
            }
            // Remove listeners from children of removed element
            element
              .querySelectorAll('a, button:not([disabled]), [role="button"]')
              .forEach(removeEventListenersFromElement);
          }
        });
      });
    });

    // Start observing
    mutationObserverRef.current.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Add window mousemove listener
    window.addEventListener("mousemove", throttledMouseMoveRef.current);

    // Cleanup function
    return () => {
      // Clean up GSAP tweens
      gsap.killTweensOf(pointerRef.current);
      gsap.killTweensOf(secondaryPointerRef.current);

      // Clean up throttled function
      if (throttledMouseMoveRef.current) {
        throttledMouseMoveRef.current.cancel();
        window.removeEventListener("mousemove", throttledMouseMoveRef.current);
        throttledMouseMoveRef.current = null;
      }

      // Clean up mutation observer
      if (mutationObserverRef.current) {
        mutationObserverRef.current.disconnect();
        mutationObserverRef.current = null;
      }

      // Clean up all event listeners
      removeAllEventListeners();
    };
  }, [
    isTouchDevice,
    updatePointer,
    addEventListenersToElement,
    removeEventListenersFromElement,
    addListenersToAllClickableElements,
    removeAllEventListeners,
  ]);

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
