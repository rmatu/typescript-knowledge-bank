// https://www.youtube.com/watch?v=iNs_z-vsfVM
import type { Equal, Expect } from "@type-challenges/utils";

type Length<TTuple extends readonly any[]> = TTuple["length"];

const tesla = ["tesla", "model 3", "model X", "model Y"] as const;
const spaceX = ["FALCON 9", "FALCON HEAVY", "DRAGON", "STARSHIP", "HUMAN SPACEFLIGHT"] as const;

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<"hello world">
];
