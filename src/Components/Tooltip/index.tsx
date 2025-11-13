import React, { ReactNode } from "react";

type TooltipProps = {
  text: string;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
};

const POSITION_CLASSES: Record<string, string> = {
  top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
  bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
  left: "right-full mr-2 top-1/2 -translate-y-1/2",
  right: "left-full ml-2 top-1/2 -translate-y-1/2",
};

const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  position = "top",
}) => {
  return (
    <div className="relative group inline-block">
      {children}
      <div
        className={`absolute z-10 hidden group-hover:block px-2 py-1 text-sm text-white bg-gray-800 rounded whitespace-nowrap ${POSITION_CLASSES[position]}`}
      >
        {text}
      </div>
    </div>
  );
};

export default React.memo(Tooltip);
