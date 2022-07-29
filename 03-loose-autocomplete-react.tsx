// https://www.youtube.com/watch?v=a_m7jxrTlaw

import React from "react";

type IconSize2 = "sm" | "xs" | Omit<string, "xs" | "sm">;
type IconSize = LooseAutocomplete<"sm" | "xs">;

type LooseAutocomplete<T extends string> = T | Omit<string, T>;

interface IconProps {
  size: IconSize;
}

export const Icon = (props: IconProps) => {
  return <></>;
};

const Comp1: React.FC = () => {
  return (
    <>
      <Icon size="xs" />
      <Icon size="something" />
    </>
  );
};
