// https://www.youtube.com/watch?v=knOgB-Aa8Pc

type MyPick<TObj, TKey extends keyof TObj> = {
  [SpecificKey in TKey]: TObj[SpecificKey];
};

type Result = MyPick<{ a: number; b: number }, "a">;

// type Result = {
//   a: number;
// }

type AnotherResult = MyPick<{ a: number; b: number }, "a" | "b">;

// type AnotherResult = {
//   a: number;
//   b: number;
// }
