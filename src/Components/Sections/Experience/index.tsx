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

      // Initial rotation to maintain consistent transform order
      gsap.set(card, {
        rotate: 0,
        rotateZ: 0,
      });

      // Handle the Z rotation animation
      gsap.to(card, {
        rotateZ: () => 5 * angleMultiplier,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: card,
          start: `top-=${40 * i} 0`, // Adjust starting point based on card index
          end: "top 20%", // End when card reaches 20% from top
          scrub: 1, // Smoothly scrub the animation based on scroll position
          onUpdate: () => {
            const isFlipped = card.getAttribute("data-flipped") === "true";
            const targetRotation = isFlipped ? 180 : 0;
            gsap.set(card, {
              transformOrigin: "center center",
              rotationX: 0,
              rotationY: targetRotation,
            });
          },
        },
      });

      // Create a ScrollTrigger to pin the card and maintain rotation state
      ScrollTrigger.create({
        trigger: card,
        start: `top 10%`, // Start position based on card index
        end: "top center", // End position when the card reaches the center
        endTrigger: ".end-element", // Use a specific end trigger
        pin: true, // Pin the card while scrolling
        pinSpacing: false, // Disable pin spacing
        markers: false, // Set to true for debugging to see the scroll trigger markers
        id: `card-${i}`, // Unique ID for each card
        onEnter: () => {
          const isFlipped = card.getAttribute("data-flipped") === "true";
          const targetRotation = isFlipped ? 180 : 0;
          gsap.set(card, {
            transformOrigin: "center center",
            rotationX: 0,
            rotationY: targetRotation,
          });
        },
        onEnterBack: () => {
          const isFlipped = card.getAttribute("data-flipped") === "true";
          const targetRotation = isFlipped ? 180 : 0;
          gsap.set(card, {
            transformOrigin: "center center",
            rotationX: 0,
            rotationY: targetRotation,
          });
        },
        onLeave: () => {
          const isFlipped = card.getAttribute("data-flipped") === "true";
          const targetRotation = isFlipped ? 180 : 0;
          gsap.set(card, {
            transformOrigin: "center center",
            rotationX: 0,
            rotationY: targetRotation,
          });
        },
        onLeaveBack: () => {
          const isFlipped = card.getAttribute("data-flipped") === "true";
          const targetRotation = isFlipped ? 180 : 0;
          gsap.set(card, {
            transformOrigin: "center center",
            rotationX: 0,
            rotationY: targetRotation,
          });
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
