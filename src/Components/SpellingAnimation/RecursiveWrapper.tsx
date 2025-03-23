import React, { ReactNode } from "react";

interface RecursiveWrapperProps {
  children: ReactNode;
  Wrapper: React.ComponentType<{ children: ReactNode; group: string }>;
  wrapperProps?: React.ComponentProps<any>;
}

const RecursiveWrapper: React.FC<RecursiveWrapperProps> = ({
  children,
  Wrapper,
  wrapperProps,
}) => {
  const wrapChildren = (node: ReactNode): ReactNode => {
    if (typeof node === "string" || typeof node === "number") {
      return <Wrapper {...wrapperProps}>{node}</Wrapper>;
    }

    if (React.isValidElement(node)) {
      return React.cloneElement(node, {
        // @ts-ignore
        children: React.Children.map(
          (node.props as React.PropsWithChildren<any>).children,
          wrapChildren
        ),
      });
    }

    return node;
  };

  return <>{React.Children.map(children, wrapChildren)}</>;
};

export default RecursiveWrapper;
