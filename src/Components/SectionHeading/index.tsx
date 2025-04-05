import React, { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: ReactNode;
  triggerClass: string;
}

const SectionHeading: React.FC<Props> = ({ triggerClass, children }) => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.to(textRef.current, {
        xPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: `.${triggerClass}`,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: true,
          scrub: 0.2,
        },
      });
    }
  }, [triggerClass]);

  return (
    <div
      className={`h-[100vh] overflow-x-auto no-scrollbar w-full flex items-center ${triggerClass}`}
    >
      <h1
        ref={textRef}
        className="text-[clamp(6rem,10vw,12rem)] items-center whitespace-nowrap  font-meddon"
      >
        {children}
      </h1>
    </div>
  );
};

export default SectionHeading;
