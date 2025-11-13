import React, { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  children: ReactNode;
  triggerClass: string;
}

const SectionHeading: React.FC<Props> = ({ triggerClass, children }) => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    // Use gsap.context to scope animations to this component and simplify cleanup
    const ctx = gsap.context(() => {
      gsap.to(textRef.current!, {
        xPercent: -100,
        ease: "back.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          end: "+=150%",
          scrub: 1,
        },
      });
    }, containerRef.current);

    return () => {
      // revert will kill tweens and ScrollTrigger attached within this context
      ctx.revert();
    };
    // Intentionally run once on mount — containerRef is stable
  }, []);

  return (
    <div
      ref={containerRef}
      className={` px-10 overflow-x-auto no-scrollbar w-full flex items-end ${triggerClass}`}
    >
      <h2
        ref={textRef}
        className="text-[clamp(6rem,10vw,12rem)] items-center whitespace-nowrap  font-luckiest-guy"
      >
        {children}
      </h2>
    </div>
  );
};

export default SectionHeading;
