"use client";

import gsap from "gsap";
import { Draggable, InertiaPlugin, ScrollTrigger } from "gsap/all";
import React, { useRef, useEffect } from "react";
import { CARDS } from "./constants";
import Card from "./Card";

const Experience: React.FC = () => {
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const draggables: any[] = [];

    const ctx = gsap.context(() => {
      if (window && window.innerWidth > 768) {
        gsap.registerPlugin(Draggable);
        gsap.registerPlugin(InertiaPlugin);

        cardRefs.current.forEach((card: any, index) => {
          const instances = Draggable.create(card, {
            bounds: document.querySelector("#experience_bounds"),
            type: "x",
            edgeResistance: 0.5,
            inertia: true,
            trigger: `.drag-trigger-${index}`,
          });
          draggables.push(...instances);
        });
      }
    }, document.body);

    (ctx as any)._draggables = draggables;

    return () => {
      (ctx as any)._draggables?.forEach((d: any) => d && d.kill && d.kill());
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      // Only use refs instead of DOM queries
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const angleMultiplier = i % 2 === 1 ? -1 : 1;
        gsap.set(card, {
          transformOrigin: "center center",
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          overwrite: "auto",
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
            if (self.isActive) {
              const isFlipped = card.getAttribute("data-flipped") === "true";
              const targetRotation = isFlipped ? 180 : 0;
              gsap.set(card, {
                transformOrigin: "center center",
                rotationX: 0,
                rotationY: targetRotation,
                rotationZ: 5 * angleMultiplier,
                overwrite: "auto",
              });
            } else {
              gsap.set(card, {
                rotationX: 0,
                rotationY:
                  card.getAttribute("data-flipped") === "true" ? 180 : 0,
                rotationZ: 0,
                overwrite: "auto",
              });
            }
          },
        });
      });
    }, document.body);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {CARDS.map((card, idx) => {
        return (
          <Card
            key={card.id}
            data={card}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
          />
        );
      })}
      <div className="end-element h-2 mb-[50vh]" />
    </>
  );
};

export default React.memo(Experience);
