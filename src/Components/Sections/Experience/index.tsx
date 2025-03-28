import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";
import Card from "./Card";
import { CARDS } from "./constants";

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleWrapper = ".title-wrapper";
  const experienceSection = ".experience-section";

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const totalScroll = containerRef.current!.scrollWidth - window.innerWidth;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: experienceSection,
        start: "top top",
        end: () => `+=${totalScroll}`,
        pin: true,
        invalidateOnRefresh: true,
        scrub: 1,
      },
    });

    timeline
      .fromTo(
        `${titleWrapper} > h1`,
        { scale: 0.8, opacity: 0.3 },
        { scale: 1, opacity: 1, duration: 0.1 }
      )
      .fromTo(
        containerRef.current,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          duration: 0.1,
        }
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
    <section
      className={
        "h-screen overflow-hidden " + experienceSection.replace(".", "")
      }
    >
      <div className={titleWrapper.replace(".", "")}>
        <h1 className="font-meddon text-5xl py-15  w-full text-center">
          with the people I have worked with
        </h1>
      </div>

      <div
        ref={containerRef}
        className="flex"
        id="experience"
        style={{
          height: "calc(100vh - 120px)",
          width: `400vw`,
        }}
      >
        {CARDS.map((card) => (
          <div className="h-2 bg-white w-full"></div>
          <Card data={card} key={card.id} />
        ))}
      </div>
    </section>
  );
};

export default Experience;
