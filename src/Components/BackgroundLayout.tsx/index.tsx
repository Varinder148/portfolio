import { NUMBER_OF_SECTIONS } from "@/utils/constants";
import { ReactNode } from "react";
import Circle from "./Circle";
import Polygon from "./Polygon";
import Triangle from "./Triangle";
import React from "react";

interface BackgroundLayoutProps {
  children: ReactNode;
}

const BackgroundLayout: React.FC<BackgroundLayoutProps> = ({ children }) => {
  const BackgroundHeight = `${NUMBER_OF_SECTIONS * 100}vh`;
  return (
    <>
      <div
        className={`relative -z-1 overflow-x-hidden w-full opacity-80 `}
        style={{
          height: BackgroundHeight,
        }}
      >
        <Circle
          className="absolute -top-[400px] left-10"
          fill="fill-olive-dark"
        />
        <Polygon
          className="h-[600px] absolute top-[600px] left-20"
          fill="fill-olive-lightest"
          variant
        />
        <Triangle
          className="w-[300px] h-[300px] float-right absolute top-[400px] right-0 translate-x-1/5"
          fill="fill-orange-light"
        />
        <Polygon
          className="h-[600px] absolute top-[1200px] right-20 rotate-45 translate-x-1/4"
          fill="fill-green-dark"
          variant
        />
        <Triangle
          className="w-[300px] h-[300px] absolute top-[1800px] left-0 -translate-x-1/2"
          fill="fill-orange-light"
        />
      </div>
      <div className="absolute top-0 w-full h-auto">{children}</div>
    </>
  );
};

export default BackgroundLayout;
