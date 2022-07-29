// https://www.youtube.com/watch?v=dZWJrjzqvv8

type First<TArray extends any[]> = TArray extends [infer TFirst, ...any[]] ? TFirst : never;

type Result = First<["a", "b"]>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>
];

type errors = [
  // @ts-expect-error
  First<"notArray">,
  // @ts-expect-error
  First<{ 0: "arrayLike" }>
];
