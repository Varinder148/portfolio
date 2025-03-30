import { useRef } from "react";
import { gsap } from "gsap";
import clsx from "clsx";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>
  ) => void;
  className?: string;
}

const Button = ({
  children,
  onClick = () => {},
  className = "",
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
        boxShadow: "0 0 0 rgba(239, 68, 68, 0)",
      },
      {
        scale: 1,
        duration: 0.5,
        ease: "power1.out",
        boxShadow: "0 0 30px rgba(239, 68, 68, 0.6)",
      }
    );

    gsap.to(buttonRef.current, {
      boxShadow: "0 0 15px rgba(239, 68, 68, 0.8)",
      duration: 0.2,
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = (e.target as HTMLButtonElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(circleRef.current, {
      scale: 0,
      top: y,
      left: x,
      boxShadow: "0 0 0 rgba(239, 68, 68, 0)",
      duration: 0.5,
      ease: "power1.out",
    });

    gsap.to(buttonRef.current, {
      boxShadow: "0 0 0 rgba(239, 68, 68, 0)",
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
        boxShadow: "0 0 0 rgba(239, 68, 68, 0)",
      },
      {
        scale: 0.8, // Slightly smaller scale for mobile
        duration: 0.3,
        ease: "power1.out",
        boxShadow: "0 0 20px rgba(239, 68, 68, 0.6)", // Reduced shadow for mobile
      }
    );

    gsap.to(buttonRef.current, {
      boxShadow: "0 0 15px rgba(239, 68, 68, 0.8)",
      duration: 0.2,
    });
  };

  const handleTouchEnd = () => {
    gsap.to(circleRef.current, {
      scale: 0,
      boxShadow: "0 0 0 rgba(239, 68, 68, 0)",
      duration: 0.3, // Faster animation for mobile
      ease: "power1.out",
    });

    gsap.to(buttonRef.current, {
      boxShadow: "0 0 0 rgba(239, 68, 68, 0)",
      duration: 0.2,
    });
  };

  return (
    <button
      ref={buttonRef}
      className={clsx(
        "uppercase cursor-pointer relative overflow-hidden border-2 rounded-b-full border-theme-red hover:text-theme-black font-rancho touch-none",
        "px-8 py-3 md:px-15 md:py-5", // Responsive padding
        className
      )}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={circleRef}
        className="bg-theme-red -z-10 absolute rounded-full"
        style={{
          width: `1000px`,
          height: `1000px`,
          transform: "translate(-50%, -50%)",
          opacity: 0,
        }}
      ></div>
      <span className="relative z-10 text-sm md:text-base">{children}</span>
    </button>
  );
};

export default Button;
