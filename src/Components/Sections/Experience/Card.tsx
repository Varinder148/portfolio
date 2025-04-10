import Button from "@/Components/Button";
import gsap from "gsap";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import Overview from "./Overview";
import "./Card.css";
import { Draggable } from "gsap/all";
import { useGSAP } from "@gsap/react";

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

  const cardRef = useRef(null);
  const frontRef = useRef(null);
  const backRef = useRef(null);

  useEffect(() => {
    gsap.set([frontRef.current, backRef.current], {
      backfaceVisibility: "hidden",
    });
  }, []);

  useGSAP(() => {
    if (window && window.innerWidth > 768) {
      gsap.registerPlugin(Draggable);

      Draggable.create(".card", {
        type: "x",
        inertia: true,
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
    <div className="w-screen grid place-items-center p-5   pt-25 lg:p-25 h-screen">
      <div
        ref={cardRef}
        className="relative card border-2 border-theme-black bg-theme-ivory w-full h-[500px] md:w-[600px] md:h-[700px]  stackingcard rounded-2xl "
      >
        <div
          ref={frontRef}
          className="absolute card-front mt-10 flex flex-col h-full w-full items-center justify-self-center px-10"
        >
          <div className="relative  h-2/3 ">
            <Image
              src={data.image}
              alt={`${data.name} office`}
              className="object-cover object-center w-full h-full "
              width={-1}
              height={-1}
              loading="lazy"
              style={{
                filter: "grayscale(50%)",
              }}
            />
            <div
              id="overlay"
              className="absolute top-0 left-0 w-full h-full bg-theme-black opacity-50 bg-theme-grainy"
            ></div>
            <span className="absolute top-1/2 left-1/2 -translate-1/2 text-2xl md:text-5xl  font-bold font-montserrat">
              {data.name}
            </span>
          </div>

          <div className="flex-1 items-center flex">
            <Button className="min-w-[300px] " onClick={() => flipCard()}>
              Know More
            </Button>
          </div>
        </div>

        <div
          ref={backRef}
          className="card-back absolute w-full h-full bg-theme-ivory text-theme-black rounded-2xl overflow-hidden"
        >
          <div className="h-full flex flex-col gap-1 p-2 md:gap-5 md:p-10">
            <>
              <Overview data={data} />
              <Button onClick={() => flipCard()} className="max-w-[300px]">
                Flip
              </Button>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Card);
