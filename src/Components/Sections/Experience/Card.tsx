import Button from "@/Components/Button";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
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

const Card: React.FC<CardProps> = ({ data, className }) => {
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
    <div className="w-screen grid place-items-center p-5 stackingcard pt-25 lg:p-25 h-screen">
      <div className={`w-full lg:w-6/7 card-container  h-full ${className}`}>
        <div ref={cardRef} className=" relative card w-full h-full">
          <div
            ref={frontRef}
            className="card-front bg-theme-black absolute bg-theme w-full h-full rounded-2xl overflow-hidden flex"
          >
            <div
              className={clsx("relative h-full", {
                "w-1/2": !isMobile,
                "w-full": isMobile,
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
                  "absolute  left-1/2 -translate-1/2 text-theme-white text-6xl font-montserrat text-center",
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
            {isMobile && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                <Button
                  className="min-w-[300px]"
                  onClick={() => flipCard(true)}
                >
                  Know More
                </Button>
              </div>
            )}

            {!isMobile && (
              <div className="w-1/2 h-full relative z-1 bg-theme-ivory text-theme-black p-15 flex flex-col justify-between">
                <div>
                  <Overview data={data} />
                </div>
                <Button className="min-w-[300px]" onClick={() => flipCard()}>
                  My Duties
                </Button>
              </div>
            )}
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
                onClick={expanded ? doubleFlip : () => flipCard()}
                className="self-center mt-auto min-w-[300px]"
              >
                {expanded ? "My Duties" : "Back"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
