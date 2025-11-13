import { useRef, useCallback, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import { throttle } from "lodash";

import { THEME } from "@/utils/constants";
import clsx from "clsx";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>,
  ) => void;
  className?: string;
  color?: string;
  type?: "submit" | "button";
  disabled?: boolean;
}

const Button = ({
  children,
  onClick = () => {},
  className = "",
  color = THEME.RED,
  type = "button",
  disabled = false,
}: ButtonProps) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Core animator (unthrottled) — keeps the DOM write in one place
  const animateCircle = useCallback((props: gsap.TweenVars) => {
    if (circleRef.current) {
      gsap.to(circleRef.current, props);
    }
  }, []);

  // Throttled wrapper that only accepts plain data objects (no React events)
  const throttledAnimateRef = useRef(
    throttle((props: gsap.TweenVars) => {
      animateCircle(props);
    }, 100),
  );

  // Clean up throttled function on unmount
  useEffect(() => {
    return () => {
      if (
        throttledAnimateRef.current &&
        (throttledAnimateRef.current as any).cancel
      ) {
        (throttledAnimateRef.current as any).cancel();
      }
    };
  }, []);

  // Handlers now extract coordinates immediately (no React event object forwarded to throttled fn)
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (circleRef.current)
        gsap.set(circleRef.current, { opacity: 1, top: y, left: x, scale: 0 });
      throttledAnimateRef.current({
        scale: 1,
        duration: 0.25,
        ease: "power1.out",
        top: y,
        left: x,
      });
    },
    [],
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      throttledAnimateRef.current({
        scale: 0,
        top: y,
        left: x,
        duration: 0.4,
        ease: "power1.out",
      });
    },
    [],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLButtonElement>) => {
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      if (circleRef.current)
        gsap.set(circleRef.current, { opacity: 1, top: y, left: x, scale: 0 });
      throttledAnimateRef.current({
        scale: 0.8,
        duration: 0.15,
        ease: "power1.out",
        top: y,
        left: x,
      });
    },
    [],
  );

  const handleTouchEnd = useCallback(() => {
    throttledAnimateRef.current({
      scale: 0,
      duration: 0.15,
      ease: "power1.out",
    });
  }, []);

  return (
    <button
      ref={buttonRef}
      className={clsx(
        `
        uppercase group   cursor-pointer  relative overflow-hidden border-2   font-montserrat touch-none px-8 py-1 md:px-15 md:py-5 ${className}
      `,
        {
          "bg-gray-100  ": disabled,
          "hover:shadow-theme-spread-md": !disabled,
        },
      )}
      style={useMemo(
        () => ({ borderColor: disabled ? "transparent" : color, color }),
        [disabled, color],
      )}
      disabled={disabled}
      type={type}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={circleRef}
        className={` -z-1 absolute rounded-full `}
        style={useMemo(
          () => ({
            background: color,
            width: `1500px`,
            height: `1500px`,
            transform: "translate(-50%, -50%)",
            opacity: 0,
          }),
          [color],
        )}
      />
      <span
        className={clsx("relative text-lg md:text-base ", {
          "group-hover:text-gray-500 text-gray-500": disabled,
          "group-active:text-theme-black group-hover:text-theme-black":
            !disabled,
        })}
      >
        {children}
      </span>
    </button>
  );
};

export default Button;
