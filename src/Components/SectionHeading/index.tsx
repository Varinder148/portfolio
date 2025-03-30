import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  text: string;
  triggerClass: string;
}

const SectionHeading: React.FC<Props> = ({ text, triggerClass }) => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.to(textRef.current, {
        xPercent: -75,
        ease: "none",
        scrollTrigger: {
          trigger: `.${triggerClass}`,
          start: "top top",
          end: "+=200%",
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
        className="text-[clamp(4rem,10vw,12rem)] items-center whitespace-nowrap ml-10 font-meddon"
      >
        {text}
      </h1>
    </div>
  );
};

export default SectionHeading;
