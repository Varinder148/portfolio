import { useState, RefObject } from "react";
import Circle from "../Circle";
import Image from "next/image";
import menuItems from "./constants";
import clsx from "clsx";
import gsap from "gsap";
import React from "react";
import { useViewport } from "@/Providers/ViewportProvider";

export const animateCompass = () => {
  const tl = gsap
    .timeline()
    .to("#compass", {
      rotate: 45,
      duration: 0.4,
      ease: "power2.out",
    })
    .to("#compass", {
      rotate: -45,
      duration: 0.3,
      ease: "power2.inOut",
    })
    .to("#compass", {
      rotate: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });

  return () => tl.kill();
};

export const animateNavOpeningandClosing = (visible: boolean) => {
  const tl = gsap.timeline();

  tl.set("#list", {
    top: 0,
    right: 0,
    position: "fixed",
    zIndex: 30,
  });
  if (!visible) {
    tl.to("#list", {
      scale: 1,
      transformOrigin: "top right",
      duration: 0.3,
      ease: "back.out",
    });
  } else {
    tl.to("#list", {
      scale: 0,
      transformOrigin: "top right",
      duration: 0.3,
      ease: "back.in",
    });
  }

  return () => tl.kill();
};

interface NavigationProps {
  className?: string;
  refs: RefObject<{ [key: string]: HTMLDivElement | null }>;
  setActiveTab: (item: string) => void;
  activeTab: string;
}

const Navigation: React.FC<NavigationProps> = ({
  className = "",
  refs,
  setActiveTab,
  activeTab,
}) => {
  const [visible, setVisible] = useState(false);
  const { isMobile } = useViewport();

  const angle = 270 / menuItems.length;
  const circleSize = 400;
  const initialRotation = 270;

  const toggleNav = () => {
    setVisible((prev) => !prev);
    animateNavOpeningandClosing(visible);
  };

  const handleClick = (anchor: string) => {
    setActiveTab(anchor);
    animateCompass();
    if (refs.current) {
      refs.current[anchor]?.scrollIntoView({ behavior: "smooth" });
    }
    toggleNav();
  };

  return (
    <>
      <button
        onClick={toggleNav}
        className={clsx(
          "fixed top-5 right-5 md:top-10 md:right-10 w-15 h-15 md:w-20 md:h-20 bg-theme-ivory rounded-full shadow-theme-spread-lg  shadow-theme-red  grid place-content-center border-2 border-theme-black cursor-pointer z-20",
          {
            hidden: visible,
          }
        )}
      >
        <Image
          src="/compass.svg"
          alt="compass"
          id="compass"
          width={isMobile ? 25 : 50}
          height={isMobile ? 25 : 50}
          priority
        />
      </button>
      <div id="list" className="fixed top-0 right-0 z-30 scale-0">
        <button
          onClick={toggleNav}
          className={clsx("min-h-screen w-screen  -z-1 fixed top-0 right-0", {
            hidden: !visible,
          })}
          id="layout"
        />

        <Circle
          fill="fill-theme-ivory "
          className="h-[1000px] w-[1000px] md:h-[1500px] md:w-[1500px]  top-0 right-0   -translate-y-1/2 translate-x-1/2  border-4 border-theme-black  rounded-full shadow-2xl shadow-theme-black "
        />

        <nav
          className={`rounded-full absolute flex items-center justify-center right-[100px] top-[100px]  md:right-[200px] md:top-[200px] z-40 scale-70 md:scale-100 ${
            className
          }`}
        >
          <Image
            src="/compass.svg"
            alt="compass"
            id="compass"
            width={150}
            height={150}
            className="bg-none "
            priority
          />
          <ul>
            {menuItems.map((item, index) => {
              const rotation =
                initialRotation +
                angle * index -
                (menuItems.find((item) => item.anchor === activeTab)?.index ||
                  0) *
                  angle;
              return (
                <li
                  key={index}
                  className={`absolute font-montserrat text-xl top-1/2 left-1/2 cursor-pointer -translate-x-1/2 -translate-y-1/2  ${
                    activeTab === item.anchor
                      ? "text-theme-red text-2xl"
                      : "text-theme-black hover:text-theme-red"
                  }`}
                  style={{
                    transform: `rotate(${rotation}deg) translate(${
                      circleSize / 2
                    }px) rotate(${rotation * -1}deg)`,
                  }}
                >
                  <button onClick={() => handleClick(item.anchor as string)}>
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
