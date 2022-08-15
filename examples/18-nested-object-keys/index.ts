export type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;

export type DotNestedKeys<T> = T extends Date | Function | Array<any>
  ? ""
  : (
      T extends object
        ? { [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<DotNestedKeys<T[K]>>}` }[Exclude<
            keyof T,
            symbol
          >]
        : ""
    ) extends infer D
  ? Extract<D, string>
  : never;

const obj = {
  a: { a1: "a1", a2: 2, a3: { "a3-1": "a3-1", "a3-2": "a3-2", "a3-3": "a3-3" } },
  b: true,
};

export type example = DotNestedKeys<typeof obj>; // "b" | "a.a1" | "a.a2" | "a.a3.a3-1" | "a.a3.a3-2" | "a.a3.a3-3"
