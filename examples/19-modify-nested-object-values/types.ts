export type DeepPartialAsString<T> = T extends Date
  ? string | undefined
  : T extends (infer InferredArrayMember)[]
  ? DeepPartialArray<InferredArrayMember>
  : T extends object
  ? DeepPartialObject<T>
  : string | undefined;

export interface DeepPartialArray<T> extends Array<DeepPartialAsString<T>> {}

export type DeepPartialObject<T> = {
  [Key in keyof T]?: DeepPartialAsString<T[Key]>;
};

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
