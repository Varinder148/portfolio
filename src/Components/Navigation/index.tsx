import { useState, RefObject } from "react";
import Circle from "../BackgroundLayout.tsx/Circle";
import Image from "next/image";
import menuItems from "./constants";
import clsx from "clsx";
import gsap from "gsap";
import React from "react";

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
}

const Navigation: React.FC<NavigationProps> = ({ className = "", refs }) => {
  const [activeItem, setActiveItem] = useState(0);
  const [visible, setVisible] = useState(false);

  const angle = 180 / menuItems.length;
  const circleSize = 400;
  const initialRotation = 270;

  const toggleNav = () => {
    setVisible((prev) => !prev);
    animateNavOpeningandClosing(visible);
  };

  const handleClick = (anchor: string, index: number) => {
    setActiveItem(index);
    animateCompass();
    refs.current[anchor]?.scrollIntoView({ behavior: "smooth" });
    toggleNav();
  };

  return (
    <>
      <button
        onClick={toggleNav}
        className={clsx(
          "fixed top-10 right-10 w-20 h-20 bg-theme-ivory rounded-full shadow-theme-spread-lg  shadow-theme-red  grid place-content-center border-2 border-theme-black cursor-pointer z-20",
          {
            hidden: visible,
          },
        )}
      >
        <Image
          src="/compass.svg"
          alt="compass"
          id="compass"
          width={50}
          height={50}
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
          className="h-[1500px] w-[1500px]  top-0 right-0   -translate-y-1/2 translate-x-1/2  border-4 border-theme-black  rounded-full shadow-2xl shadow-theme-black "
        />

        <nav
          className={
            "rounded-full absolute flex items-center justify-center  right-[200px] top-[200px] z-40 " +
            className
          }
        >
          <Image
            src="/compass.svg"
            alt="compass"
            id="compass"
            width={150}
            height={150}
            className="bg-none "
          />
          <ul>
            {menuItems.map((item, index) => {
              const rotation =
                initialRotation + angle * index - activeItem * angle;
              return (
                <li
                  key={index}
                  className={`absolute top-1/2 left-1/2 cursor-pointer -translate-x-1/2 -translate-y-1/2  ${
                    activeItem === index
                      ? "text-theme-red text-2xl"
                      : "text-theme-black hover:text-theme-red"
                  }`}
                  style={{
                    transform: `rotate(${rotation}deg) translate(${
                      circleSize / 2
                    }px) rotate(${rotation * -1}deg)`,
                  }}
                >
                  <button
                    onClick={() => handleClick(item.anchor as string, index)}
                  >
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
