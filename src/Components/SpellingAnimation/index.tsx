import React, { memo, useMemo } from "react";

interface SpellingAnimationProps {
  delimiter?: string;
  children?: React.ReactNode;
  group: string;
}

const SplitAndId: React.FC<SpellingAnimationProps> = memo(
  ({ delimiter = "", children = "", group }) => {
    const letters = useMemo(() => {
      if (typeof children === "string") {
        return children.split(delimiter);
      }
      return null;
    }, [children, delimiter]);

    if (letters) {
      return (
        <>
          {letters.map((letter, idx) => (
            <span
              key={idx}
              className={`${group.replace(".", "")} opacity-100 translate-y-10 rotate-10`}
            >
              {letter}
            </span>
          ))}
        </>
      );
    }

    return <>{children}</>;
  },
);

SplitAndId.displayName = "SplitAndId";
export default SplitAndId;
