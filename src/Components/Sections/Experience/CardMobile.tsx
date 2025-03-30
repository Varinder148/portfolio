import Button from "@/Components/Button";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import Responsibilities from "./Responsibilities";
import Overview from "./Overview";
import "./CardMobile.css";

interface CardProps {
  data: {
    id: number;
    logo: string;
    name: string;
    from: string;
    to: string;
    responsibilities: string[];
    location: string;
    position: string;
  };
  className?: string;
}

const CardMobile: React.FC<CardProps> = ({ data, className }) => {
  const [expanded, setIsExpanded] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const cardRef = useRef(null);
  const frontRef = useRef(null);
  const backRef = useRef(null);

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
    <div className="w-screen grid place-items-center h-screen">
      <div
        className={"w-[400px] h-[600px] mx-auto card-container " + className}
      >
        <div ref={cardRef} className="card relative w-full h-full">
          <div
            ref={frontRef}
            className="card-front absolute w-full h-full rounded-2xl overflow-hidden"
          >
            <div className="relative w-full h-full">
              <div className="relative w-full h-full">
                <Image
                  src={`./office (${data.id}).webp`}
                  alt={`${data.name} office`}
                  fill
                  className="object-cover opacity-50"
                />
              </div>
              <div className="absolute top-1/8 left-1/2 -translate-x-1/2 text-theme-white text-7xl font-rancho text-center">
                {data.name}
              </div>
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                <Button onClick={() => flipCard(true)}>Know More</Button>
              </div>
              {/* Remove My Duties button */}
            </div>
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
                onClick={expanded ? doubleFlip : () => flipCard(expanded)}
                className="self-center mt-auto"
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

export default CardMobile;
