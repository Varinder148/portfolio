import Button from "@/Components/Button";
import gsap from "gsap";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import Responsibilities from "./Responsibilities";
import Overview from "./Overview";
import "./Card.css";
import clsx from "clsx";
import { useViewport } from "@/Providers/ViewportProvider";

interface CardProps {
  data: {
    id: number;
    image: string;
    name: string;
    from: string;
    to: string;
    responsibilities: string[];
    location: string;
    position: string;
  };
  className?: string;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const [expanded, setIsExpanded] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const cardRef = useRef(null);
  const frontRef = useRef(null);
  const backRef = useRef(null);

  const { isMobile } = useViewport();

  useEffect(() => {
    gsap.set([frontRef.current, backRef.current], {
      backfaceVisibility: "hidden",
    });
  }, []);

  const flipCard = (overview = false) => {
    const duration = 0.6;
    if (!isFlipped) {
      setIsExpanded(overview);
      gsap.to(cardRef.current, {
        rotationY: 180,
        duration,
        ease: "power2.inOut",
      });
      setIsFlipped(true);
    } else {
      gsap.to(cardRef.current, {
        rotationY: 0,
        duration,
        ease: "power2.inOut",
        onComplete: () => {
          setIsExpanded(!expanded);
        },
      });
      setIsFlipped(false);
    }
  };

  const doubleFlip = () => {
    const duration = 0.6;
    // First flip (to front)
    gsap.to(cardRef.current, {
      rotationY: 0,
      duration,
      ease: "power2.inOut",
      onComplete: () => {
        setIsExpanded(false);
        // Second flip (back to back) in opposite direction
        gsap.to(cardRef.current, {
          rotationY: -180,
          duration,
          ease: "power2.inOut",
        });
      },
    });
  };

  return (
    <div className="w-screen grid place-items-center p-5  pt-25 lg:p-25 h-screen">
      <div
        ref={cardRef}
        className=" relative card w-full md:w-6/7 h-full stackingcard"
      >
        <div
          ref={frontRef}
          className="card-front bg-theme-black absolute bg-theme w-full h-full rounded-2xl overflow-hidden flex"
        >
          <div
            className={clsx("relative h-full w-full", {
              // "w-1/2": !isMobile,
              // "w-full": isMobile,
            })}
          >
            <div className="relative w-full h-full">
              <Image
                src={data.image}
                alt={`${data.name} office`}
                fill
                className="object-cover object-center  opacity-50"
                style={{
                  filter: "grayscale(50%)",
                }}
              />
            </div>
            <div
              className={clsx(
                "absolute  left-1/2 -translate-1/2 text-theme-white text-4xl md:text-6xl font-montserrat text-center",
                {
                  "top-1/2": !isMobile,
                  "top-1/6": isMobile,
                },
              )}
            >
              {data.name}
            </div>

            {/* Remove My Duties button */}
          </div>
          {
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
              <Button className="min-w-[300px]" onClick={() => flipCard(true)}>
                Know More
              </Button>
            </div>
          }
        </div>

        <div
          ref={backRef}
          className="card-back absolute w-full h-full bg-theme-ivory text-theme-black rounded-2xl overflow-hidden"
        >
          <div className="h-full flex flex-col gap-5 p-10">
            {expanded ? (
              <Overview data={data} />
            ) : (
              <Responsibilities data={data} />
            )}
            <Button
              onClick={expanded && isMobile ? doubleFlip : () => flipCard()}
              className="self-center mt-auto min-w-[300px]"
            >
              {expanded && isMobile ? "My Duties" : "Back"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Card);
