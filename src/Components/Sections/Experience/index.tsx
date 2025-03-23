import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React from "react";

const Experience: React.FC = () => {
  const cards = [
    { id: 1, color: "#000000" },
    { id: 2, color: "#66ff66" },
    { id: 3, color: "#6666ff" },
    { id: 4, color: "#ffff66" },
    { id: 5, color: "#66ffff" },
  ];

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to("#experience div", {
      xPercent: -100 * (cards.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: "#experience",
        pin: true,
        scrub: 0.2, // Increased scroll speed
        snap: {
          snapTo: 1 / (cards.length - 1),
          duration: 0.1, // Reduced snap animation duration
          ease: "power1.inOut",
        },
        end: () =>
          "+=" +
          (document.querySelector("#experience") as HTMLElement)!.offsetWidth,
      },
    });
  });

  return (
    <div
      className="flex "
      id="experience"
      style={{
        // backgroundColor: "#f0f0f0",
        height: "100vh",
        width: "500vw",
        borderRadius: "50%",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-opacity-5"
          style={{
            backgroundColor: card.color,
            width: "100vw",
            height: "100vh",
            borderRadius: "10px",
          }}
        ></div>
      ))}
    </div>
  );
};

export default Experience;
