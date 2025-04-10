import { useRef } from "react";
import { gsap } from "gsap";

import { ReactNode } from "react";
import { THEME } from "@/utils/constants";

interface ButtonProps {
  children: ReactNode;
  onClick?: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>,
  ) => void;
  className?: string;
  color?: string;
}

const Button = ({
  children,
  onClick = () => {},
  className = "",
  color = THEME.RED,
}: ButtonProps) => {
  const circleRef = useRef(null);
  const buttonRef = useRef(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = (e.target as HTMLButtonElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const tl = gsap.timeline();

    tl.to(circleRef.current, {
      opacity: 1,
      duration: 0,
    }).fromTo(
      circleRef.current,
      {
        scale: 0,
        top: y,
        left: x,
      },
      {
        scale: 1,
        duration: 0.5,
        ease: "power1.out",
      },
    );
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = (e.target as HTMLButtonElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(circleRef.current, {
      scale: 0,
      top: y,
      left: x,
      duration: 0.5,
      ease: "power1.out",
    });

    gsap.to(buttonRef.current, {
      duration: 0.2,
    });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    const touch = e.touches[0];
    const rect = (e.target as HTMLButtonElement).getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const tl = gsap.timeline();

    tl.to(circleRef.current, {
      opacity: 1,
      duration: 0,
    }).fromTo(
      circleRef.current,
      {
        scale: 0,
        top: y,
        left: x,
      },
      {
        scale: 0.8,
        duration: 0.3,
        ease: "power1.out",
      },
    );
  };

  const handleTouchEnd = () => {
    gsap.to(circleRef.current, {
      scale: 0,
      duration: 0.3, // Faster animation for mobile
      ease: "power1.out",
    });

    gsap.to(buttonRef.current, {
      duration: 0.2,
    });
  };

  return (
    <button
      ref={buttonRef}
      className={`
        uppercase group hover:shadow-theme-spread-md  cursor-pointer  relative overflow-hidden border-2   font-montserrat touch-none px-8 py-1 md:px-15 md:py-5 ${className}
      `}
      style={{
        borderColor: color,
        color,
      }}
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
      <span className="relative text-lg md:text-base group-active:text-theme-black group-hover:text-theme-black">
        {children}
      </span>
    </button>
  );
};

export default Button;
