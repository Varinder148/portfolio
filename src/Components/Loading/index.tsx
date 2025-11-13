import React from "react";
import Circle from "../Circle";

interface LoadingProps {
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ className = "" }) => {
  return (
    <div
      className={`w-screen h-screen bg-theme-black grid place-items-center fixed z-50 overflow-hidden rounded-b-4xl ${className}`}
    >
      <div className="relative w-32 h-32">
        <div className="absolute inset-0">
          <Circle
            className="w-32 h-32 animate-bounce"
            fill="fill-theme-red opacity-80"
          />
        </div>
        <div className="absolute inset-0">
          <Circle
            className="w-24 h-24 m-4 animate-bounce"
            fill="fill-theme-ivory opacity-80"
          />
        </div>
        <div className="absolute inset-0 animate-bounce">
          <Circle
            className="w-16 h-16 m-8"
            fill="fill-theme-violet opacity-80"
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Loading);
