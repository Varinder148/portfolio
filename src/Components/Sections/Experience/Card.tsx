import Button from "@/Components/Button";
import gsap from "gsap";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import Overview from "./Overview";
import "./Card.css";
import { Draggable, InertiaPlugin } from "gsap/all";
import { useGSAP } from "@gsap/react";
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
  const [isFlipped, setIsFlipped] = useState(false);

  const { isMobile } = useViewport();

  const cardRef = useRef(null);
  const frontRef = useRef(null);
  const backRef = useRef(null);

  useEffect(() => {
    gsap.set([frontRef.current, backRef.current], {
      backfaceVisibility: "hidden",
    });
    gsap.set(cardRef.current, {
      transformOrigin: "center center",
      transformPerspective: 1000,
    });
  }, []);

  useGSAP(() => {
    if (window && window.innerWidth > 768) {
      gsap.registerPlugin(Draggable);
      gsap.registerPlugin(InertiaPlugin);

      const cards = gsap.utils.toArray(".card");

      cards.forEach((card: any, index) => {
        Draggable.create(card, {
          bounds: document.querySelector("#experience_bounds"),
          type: "x",
          edgeResistance: 0.5,
          inertia: true,
          trigger: `.drag-trigger-${index}`,
        });
      });
    }
  });

  const flipCard = () => {
    const duration = 0.6;
    if (!isFlipped) {
      // setIsExpanded(true);
      gsap.to(cardRef.current, {
        rotationY: 180,
        duration,
        ease: "power2.inOut",
        onComplete: () => {
          setIsFlipped(true);
        },
      });
    } else {
      gsap.to(cardRef.current, {
        rotationY: 0,
        duration,
        ease: "power2.inOut",
        onComplete: () => {
          setIsFlipped(false);
        },
      });
    }
  };

  return (
    <div
      className="w-screen grid place-items-center p-5 pt-25 lg:p-25 h-screen"
      id="experience_bounds"
    >
      <div
        ref={cardRef}
        data-flipped={isFlipped}
        className="relative card border-2 border-theme-black bg-theme-ivory w-full h-[500px] md:w-[600px] md:h-[700px] stackingcard rounded-2xl"
      >
        <div
          ref={frontRef}
          className="absolute card-front mt-10 flex flex-col h-full w-full items-center justify-self-center px-10"
        >
          <button className={`relative drag-trigger-${data.id}  h-2/3 `} id="">
            <Image
              src={data.image}
              alt={`${data.name} office`}
              className="object-cover object-center w-full h-full "
              width={0}
              height={0}
              loading="lazy"
              style={{
                filter: "grayscale(50%)",
              }}
            />
            <div
              id="overlay"
              className="absolute top-0 left-0 w-full h-full bg-theme-black opacity-50 bg-theme-grainy"
            ></div>
            <span className="absolute text-center top-1/2 left-1/2 -translate-1/2 text-2xl md:text-5xl  font-bold font-montserrat">
              {data.name}
            </span>
            {!isMobile && (
              <div className="text-sm font-normal absolute text-center bottom-2 left-1/2 -translate-1/2 ">
                You can drag this card from this portion
              </div>
            )}
          </button>

          <div className="flex-1 items-center flex">
            <Button className="min-w-[300px] " onClick={() => flipCard()}>
              Know More
            </Button>
          </div>
        </div>

        <a
          ref={backRef}
          className={`card-back drag-trigger-${data.id}  absolute w-full h-full bg-theme-ivory text-theme-black rounded-2xl overflow-hidden`}
        >
          <div className="h-full flex flex-col gap-1 p-2 md:gap-5 md:p-10">
            <>
              <Overview data={data} />
              <Button onClick={() => flipCard()} className="max-w-[300px]">
                Flip
              </Button>
            </>
          </div>
        </a>
      </div>
    </div>
  );
};

export default React.memo(Card);
