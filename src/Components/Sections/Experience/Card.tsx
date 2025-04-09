import Button from "@/Components/Button";
import gsap from "gsap";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import Overview from "./Overview";
import "./Card.css";
import { Draggable, InertiaPlugin } from "gsap/all";

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
    gsap.registerPlugin(Draggable, InertiaPlugin);

    Draggable.create(".card", {
      type: "x",
      inertia: true,
    });

    gsap.set([frontRef.current, backRef.current], {
      backfaceVisibility: "hidden",
    });
  }, []);

  const flipCard = () => {
    const duration = 0.6;
    if (!isFlipped) {
      // setIsExpanded(true);
      gsap.to(cardRef.current, {
        rotationY: 180,
        duration,
        ease: "power2.inOut",
        onStart: () => {
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

  // const doubleFlip = () => {
  //   const duration = 0.6;
  //   // First flip (to front)
  //   gsap.to(cardRef.current, {
  //     rotationY: 0,
  //     duration,
  //     ease: "power2.inOut",
  //     onComplete: () => {
  //       // Second flip (back to back) in opposite direction
  //       gsap.to(cardRef.current, {
  //         rotationY: -180,
  //         duration,
  //         ease: "power2.inOut",
  //       });
  //     },
  //   });
  // };

  return (
    <div className="w-screen grid place-items-center p-5   pt-25 lg:p-25 h-screen">
      <div
        ref={cardRef}
        className="relative card border-2 border-theme-black bg-theme-ivory  w-[600px] h-[700px]  stackingcard rounded-2xl "
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
              style={{
                filter: "grayscale(50%)",
              }}
            />
            <div
              id="overlay"
              className="absolute top-0 left-0 w-full h-full bg-theme-black opacity-50 bg-theme-grainy"
            ></div>
            <span className="absolute top-1/2 left-1/2 -translate-1/2 text-5xl  font-bold font-montserrat">
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
          <div className="h-full flex flex-col gap-5 p-10">
            {isFlipped && (
              <>
                <Overview data={data} />
                <Button onClick={() => flipCard()} className="max-w-[300px]">
                  Flip
                </Button>
              </>
            )}

            {/* <Button
              onClick={expanded && isMobile ? doubleFlip : () => flipCard()}
              className="self-center mt-auto min-w-[300px]"
            >
              {expanded && isMobile ? "My Duties" : "Back"}
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Card);
