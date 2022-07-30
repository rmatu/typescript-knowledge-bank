// https://www.youtube.com/watch?v=M4-Jl9JWGmo

export type Letters = "a" | "b" | "c";

type RemoveC<TType> = TType extends "c" ? never : TType;

type WithoutC = RemoveC<Letters>; // "a" | "b"
