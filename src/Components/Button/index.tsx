import { useRef } from "react";
import { gsap } from "gsap";

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

  // Helper to animate the circle
  const animateCircle = (props: any) => {
    if (circleRef.current) {
      gsap.to(circleRef.current, props);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gsap.set(circleRef.current, { opacity: 1, top: y, left: x, scale: 0 });
    animateCircle({ scale: 1, duration: 0.5, ease: "power1.out" });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    animateCircle({
      scale: 0,
      top: y,
      left: x,
      duration: 0.5,
      ease: "power1.out",
    });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    gsap.set(circleRef.current, { opacity: 1, top: y, left: x, scale: 0 });
    animateCircle({ scale: 0.8, duration: 0.3, ease: "power1.out" });
  };

  const handleTouchEnd = () => {
    animateCircle({ scale: 0, duration: 0.3, ease: "power1.out" });
  };

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
      style={{
        borderColor: disabled ? "transparent" : color,
        color,
      }}
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
        style={{
          background: color,
          width: `1500px`,
          height: `1500px`,
          transform: "translate(-50%, -50%)",
          opacity: 0,
        }}
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
