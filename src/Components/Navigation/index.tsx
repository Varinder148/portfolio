"use client";

import { useState } from "react";

let menuItems = [
  {
    name: "Profile",
  },
  {
    name: "Experience",
  },
  {
    name: "Skills",
  },
  {
    name: "Education",
  },
  {
    name: "Contact Info",
  },
];

const Navigation: React.FC = ({ className }) => {
  const [activeItem, setActiveItem] = useState(0);

  const angle = 180 / menuItems.length; // Calculate the angle for each item
  const circleSize = 300;
  const initialRotation = 180;
  return (
    <nav
      className={
        "rounded-full w-[500px] h-[500px] fixed top-0 right-0 scale-75 " +
        className
      }
    >
      <div className="fixed top-1/2 right-20">
        <div className="text-2xl">of Mine</div>
        <ul>
          {menuItems.reverse().map((item, index) => {
            const rotation =
              initialRotation + angle * index - activeItem * angle;

            return (
              <li
                key={index}
                onClick={() => setActiveItem(index)}
                className={`absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
                  activeItem === index
                    ? "text-amber-700 text-2xl"
                    : "text-black-light"
                }`}
                style={{
                  transform: `rotate(${rotation}deg) translate(${
                    circleSize / 2
                  }px) rotate(${rotation * -1}deg)`,
                }}
              >
                <a href={`#${item.name}`} className="whitespace-nowrap">
                  {item.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
