import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React from "react";
import { NEON } from "@/utils/constants";
import Card from "./Card";

const Experience: React.FC = () => {
  const cards = [
    { id: 1, color: "#000000" },
    { id: 2, color: "#66ff66" },
    { id: 3, color: "#6666ff" },
    { id: 4, color: "#ffff66" },
    { id: 5, color: "#66ffff" },
  ];

  const titleWrapper = ".title-wrapper";

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();
    const titleAnim = gsap.to(titleWrapper + " > h1", {
      scale: 1,
      scrollTrigger: {
        trigger: titleWrapper,
        start: "top center",
        end: "+=300",
        scrub: true,
        pin: true,
      },
      textShadow: NEON,
    });

    const horizontalAnim = gsap.to("#experience > div", {
      xPercent: -100 * (cards.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: "#experience",
        pin: true,
        scrub: 1,
        end: () =>
          "+=" +
          (document.querySelector("#experience") as HTMLElement)!.offsetWidth,
      },
    });

    return () => {
      titleAnim.kill();
      horizontalAnim.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  });

  return (
    <>
      <div className={titleWrapper.replace(".", "")}>
        <h1
          className={
            " font-meddon text-5xl py-15 stroke-text w-full text-center "
          }
        >
          with the people I have worked with
        </h1>
      </div>

      <div
        className="flex "
        id="experience"
        style={{
          height: "100vh",
          width: "200vw",
          borderRadius: "50%",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            style={{
              width: "100vw",
              height: "100vh",
              borderRadius: "10px",
            }}
          >
            <Card />
          </div>
        ))}
      </div>
    </>
  );
};

export default Experience;
