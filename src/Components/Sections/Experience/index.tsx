"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React from "react";
import { CARDS } from "./constants";
import Card from "./Card";

const Experience: React.FC = () => {
  useGSAP(() => {
    if (typeof window === "undefined") return;
    const cards = gsap.utils.toArray(".stackingcard");

    cards.forEach((card: any, i) => {
      const angleMultiplier = i % 2 === 1 ? -1 : 1;

      gsap.set(card, {
        transformOrigin: "center center",
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
      });

      ScrollTrigger.create({
        trigger: card,
        start: `top 10%`,
        end: "top center",
        endTrigger: ".end-element",
        pin: true,
        pinSpacing: false,
        markers: false,
        id: `card-${i}`,
        onToggle: (self) => {
          // Only handle rotations when card is pinned
          if (self.isActive) {
            const isFlipped = card.getAttribute("data-flipped") === "true";
            const targetRotation = isFlipped ? 180 : 0;
            gsap.set(card, {
              transformOrigin: "center center",
              rotationX: 0,
              rotationY: targetRotation,
              rotationZ: 5 * angleMultiplier,
            });
          } else {
            // Reset rotations when unpinned
            gsap.set(card, {
              rotationX: 0,
              rotationY: card.getAttribute("data-flipped") === "true" ? 180 : 0,
              rotationZ: 0,
            });
          }
        },
      });
    });
  });

  return (
    <>
      {CARDS.map((card) => {
        return <Card key={card.id} data={card} />;
      })}
      <div className="end-element h-2 mb-[50vh]" />
    </>
  );
};

export default React.memo(Experience);
