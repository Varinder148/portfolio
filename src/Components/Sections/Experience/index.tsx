import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";
// import { NEON } from "@/utils/constants";
import Card from "./Card";

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cards = [
    { id: 1, color: "#000000", logo: "./infosys.png" },
    { id: 2, color: "#66ff66", logo: "./geektrust.png" },
    { id: 3, color: "#6666ff", logo: "./thoughtworks.svg" },
    { id: 4, color: "#ffff66", logo: "./gartner.svg" },
  ];

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const totalScroll = containerRef.current!.scrollWidth - window.innerWidth;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#experience-section",
        start: "top top",
        end: () => `+=${totalScroll}`,
        pin: true,
        invalidateOnRefresh: true,
        scrub: 1,
        markers: true,
      },
    });

    timeline
      .fromTo(
        ".title-wrapper > h1",
        { scale: 0.8, opacity: 0.3 },
        { scale: 1, opacity: 1, duration: 0.1 },
      )
      .fromTo(
        containerRef.current,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          duration: 0.1,
        },
      )
      .to(containerRef.current, {
        translateX: -totalScroll,
        ease: "power1.out",
      });

    return () => {
      timeline.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="experience-section" className="h-screen overflow-hidden">
      <div className="title-wrapper">
        <h1 className="font-meddon text-5xl py-15 stroke-text w-full text-center">
          with the people I have worked with
        </h1>
      </div>

      <div
        ref={containerRef}
        className="flex"
        id="experience"
        style={{
          height: "calc(100vh - 120px)",
          width: `${cards.length * 100}vw`,
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex-shrink-0"
            style={{
              width: "100vw",
              height: "100vh",
              borderRadius: "10px",
              backgroundColor: card.color,
            }}
          >
            <Card data={card} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
