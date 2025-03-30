import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";
import { CARDS } from "./constants";
import CardMobile from "./CardMobile";

const Experience: React.FC = () => {
  const triggerRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const totalScroll = containerRef.current!.scrollWidth - window.innerWidth;
    const snapPoints = Array.from(
      { length: CARDS.length },
      (_, i) => i / (CARDS.length - 1),
    );

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: () => `+=${totalScroll}`,

        pin: true,
        invalidateOnRefresh: true,
        scrub: 0.5,
        snap: snapPoints,
      },
    });

    timeline.to(containerRef.current, {
      translateX: -totalScroll,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={triggerRef}
      className="overflow-x-auto w-full h-screen grid place-items-center no-scrollbar "
    >
      <div ref={containerRef} className="flex">
        {CARDS.map((card) => (
          <CardMobile data={card} key={card.id} />
        ))}
      </div>
    </div>
  );
};

export default Experience;
