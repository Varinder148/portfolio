import Button from "@/Components/Button";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import Responsibilities from "./Responsibilities";
import Overview from "./Overview";

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
  className?: string; // Add className property
}

// To be removed before finalising

const Card: React.FC<CardProps> = ({ data, className }) => {
  const [expanded, setIsExpanded] = useState(true);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const content = useRef(null);
  const image = useRef(null);

  useEffect(() => {
    gsap.set(content.current, {
      translateX: "-100%",
    });
  }, []);

  const openMenu = () => {
    gsap
      .timeline()
      .set(image.current, {
        translateY: "-100px",
        translateX: "-48%",
      })
      .to(image.current, {
        xPercent: -50,
        duration: 0.3,
        ease: "power2.out",
      })
      .to(content.current, {
        translateX: "0%",
        duration: 0.3,
        ease: "power2.out",
      });
    setIsContentVisible(true);
  };

  const closeMenu = () => {
    return gsap
      .timeline()
      .set(image.current, {
        translateY: "-100px",
        translateX: "-48%",
      })
      .to(content.current, {
        translateX: "-101%",
        duration: 0.3,
        ease: "power2.in",
      })
      .to(image.current, {
        xPercent: 50,
        duration: 0.3,
        ease: "power2.in",
      })
      .then(() => {
        setIsContentVisible(false);
      });
  };

  const handleButtonClick = (overview = false) => {
    if (isContentVisible) {
      if (overview === !expanded) {
        closeMenu();
        return;
      }
      closeMenu().then(() => {
        setIsExpanded(!overview);
        openMenu();
      });
    } else {
      setIsExpanded(!overview);
      openMenu();
    }
  };

  return (
    <div className="w-screen grid place-items-center h-screen">
      <div
        className={`max-w-[800px] text-2xl flex px-10 gap-10 font-light relative${
          className
        }`}
      >
        <div className="flex flex-col px-20 items-center flex-1 text-theme-lg">
          <div
            ref={image}
            className="absolute self-start  bg-theme-black -translate-y-[100px] z-20"
          >
            <div className="relative cursor-pointer">
              <Image
                src={`./office (${data.id}).webp`}
                width={400}
                height={600}
                className="w-[400px] h-[600px] object-cover opacity-50"
                alt={`${data.name} office`}
              />
              <div className="absolute top-1/4 left-1/2 -translate-1/2 text-theme-white text-7xl font-rancho">
                {data.name}
              </div>
              <div className="absolute bottom-30 left-1/2 -translate-x-1/2">
                <Button onClick={() => handleButtonClick(true)}>
                  Overview
                </Button>
              </div>
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                <Button onClick={() => handleButtonClick()}>
                  My&nbsp;Duties
                </Button>
              </div>
            </div>
          </div>

          <div className="w-[800px] overflow-hidden  ">
            <div
              ref={content}
              className="w-full  flex justify-between flex-col origin-left"
            >
              <div className="  border-2 border-theme-gray h-full flex flex-col gap-5 min-h-[400px] px-20 py-5 rounded-2xl">
                {expanded ? (
                  <Responsibilities data={data} />
                ) : (
                  <Overview data={data} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
