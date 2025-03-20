import { useState, RefObject } from "react";
import Circle from "../BackgroundLayout.tsx/Circle";
import Image from "next/image";
import menuItems from "./constants";
import clsx from "clsx";
import gsap from "gsap";
import React from "react";

export const animateCompass = () => {
  gsap
    .timeline()
    .to("#compass", {
      rotate: 120,
      duration: 0.2,
      ease: "none",
    })
    .to("#compass", {
      rotate: 120 * -1,
      duration: 0.2,
      ease: "none",
    })
    .to("#compass", {
      rotate: 0,
      duration: 0.6,
      ease: "elastic",
    });
};

export const animateNavOpeningandClosing = (visible: boolean) => {
  if (!visible) {
    gsap.to("#list", {
      scale: 1,
      duration: 0.2,
      top: 200,
      ease: "back.out(1.7)",
      right: 200,
    });
    gsap.to("#circle", {
      scale: 1,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  } else {
    gsap.to("#list", {
      scale: 0,
      duration: 0.2,
      ease: "back.in(1.7)",
      top: 0,
      right: 0,
    });
    gsap.to("#circle", {
      scale: 0,
      duration: 0.3,
      ease: "back.in(1.7)",
    });
  }
};

interface NavigationProps {
  className?: string;
  refs: RefObject<{ [key: string]: HTMLDivElement | null }>;
}

const Navigation: React.FC<NavigationProps> = ({ className = "", refs }) => {
  const [activeItem, setActiveItem] = useState(0);
  const [visible, setVisible] = useState(false);

  const angle = 180 / menuItems.length; // Calculate the angle for each item
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
        className={clsx("h-[100vh] w-[100vw] bg-black opacity-20 z-10 fixed", {
          hidden: !visible,
        })}
      ></button>
      <button
        onClick={toggleNav}
        className={clsx(
          "fixed top-20 right-20 w-20 h-20 bg-amber-50 rounded-full shadow-md grid place-content-center border-2 border-black cursor-pointer z-20",
          {
            hidden: visible,
          }
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
      <Circle
        fill="fill-white "
        className="h-[1500px] w-[1500px]  top-0 right-0 fixed -translate-y-1/2 translate-x-1/2 scale-0 border-4 border-olive-dark rounded-full shadow-2xl z-20"
        id="circle"
      />

      <nav
        id="list"
        className={
          "rounded-full fixed flex items-center justify-center scale-0 right-0 top-0 z-20 " +
          className
        }
      >
        <Image
          src="/compass.svg"
          alt="compass"
          id="compass"
          width={150}
          height={150}
          className="bg-none  "
        />
        <ul>
          {menuItems.map((item, index) => {
            const rotation =
              initialRotation + angle * index - activeItem * angle;
            return (
              <li
                key={index}
                onClick={() => handleClick(item.anchor as string, index)}
                className={`absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 transition-all  ${
                  activeItem === index
                    ? "text-red-matte text-2xl"
                    : "text-black-light"
                }`}
                style={{
                  transform: `rotate(${rotation}deg) translate(${
                    circleSize / 2
                  }px) rotate(${rotation * -1}deg)`,
                }}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
