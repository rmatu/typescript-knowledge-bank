// https://www.youtube.com/watch?v=knOgB-Aa8Pc

type MyPick<TObj, TKey extends keyof TObj> = {
  [SpecificKey in TKey]: TObj[SpecificKey];
};

type Yeah = MyPick<{ a: number; b: number }, "a">;

// type Yeah = {
//   a: number;
// }

type Wow = MyPick<{ a: number; b: number }, "a" | "b">;

// type Wow = {
//   a: number;
//   b: number;
// }
