import React, { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  children: ReactNode;
  triggerClass: string;
}

const SectionHeading: React.FC<Props> = ({ triggerClass, children }) => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const anim = gsap.to(textRef.current, {
      xPercent: -100,
      ease: "power2",
      scrollTrigger: {
        trigger: `.${triggerClass}`,
        start: "top 65%",
        end: "+=150%",
        scrub: 1,
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim?.kill();
    };
  }, [triggerClass]);

  return (
    <div
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
