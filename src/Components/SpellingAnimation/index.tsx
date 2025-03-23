import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { ReactNode } from "react";

interface SpellingAnimationProps {
  delimiter?: string;
  children?: ReactNode;
  group: string;
}

const SplitAndId: React.FC<SpellingAnimationProps> = ({
  delimiter = "",
  children = "",
  group,
}) => {
  if (typeof children === "string") {
    return (
      <>
        {children.split(delimiter).map((letter, idx) => (
          <span key={idx} className={`${group.replace(".", "")} invisible`}>
            {letter}
          </span>
        ))}
      </>
    );
  }

  return <>{children}</>;
};

export default SplitAndId;
