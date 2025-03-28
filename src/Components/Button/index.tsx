import { useRef } from "react";
import { gsap } from "gsap";
import clsx from "clsx";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  children,
  variant = "primary",
  onClick = () => {},
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

  return (
    <button
      ref={buttonRef}
      className={clsx(
        " uppercase cursor-pointer px-15 py-5 relative overflow-hidden border-2 border-theme-red font-rancho ",
        {
          "rounded-bl-full rounded-tr-full rounded-tl-2xl rounded-br-2xl":
            variant === "primary",
          "rounded-bl-2xl rounded-tr-2xl rounded-tl-full rounded-br-full":
            variant === "secondary",
        }
      )}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={circleRef}
        className="bg-theme-red -z-10 absolute rounded-full "
        style={{
          width: "1000px",
          height: "1000px",
          transform: "translate(-50%, -50%)",
          opacity: 0,
        }}
      ></div>
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;
