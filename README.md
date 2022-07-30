# Knowledge bank on advanced TypeScript

## Knowledge gained from

- Matt Pocock: https://twitter.com/mattpocockuk
- Contributors of: https://github.com/type-challenges/type-challenges

## Description

- [00-tuple-to-object](#08-tuple-to-object)
- [01-index-access](#01-index-access)
- [02-operating-on-object-keys](#02-operating-on-object-keys)
- [03-loose-autocomplete-react](#03-loose-autocomplete-react)
- [04-readonly](#04-readonly)
- [05-dynamic-function-arguments](05-dynamic-function-arguments)
- [06-tuple-length](#06-tuple-length)
- [07-first-of-array](#07-first-of-array)
- [08-easy-pick](#08-easy-pick)

## 00-tuple-to-object

<a href="https://www.youtube.com/watch?v=nK6qW_NsPvc" target="_blank"><img src="https://img.shields.io/badge/-YouTube explanation-c4302b" alt="YouTube"/></a>
<a href="./examples/00-tuple-to-objet" target="_blank"><img src="https://img.shields.io/badge/-Code-d9901a" alt="Code"/></a>
<br />
<br />
Give an array, transform into an object type and the key/value must in the given array.

```ts
type TupleToObject<TTuple extends readonly PropertyKey[]> = {
  [TIndex in TTuple[number]]: TIndex;
};

type PK = PropertyKey; // string | number | symbol;

type ArrayMember = typeof tuple[number]; // "tesla" | "model 3" | "model X" | "model Y";

const tuple = ["tesla", "model 3", "model X", "model Y"] as const;
const tupleNumber = [1, 2, 3, 4] as const;
const tupleMix = [1, "2", 3, "4"] as const;

type cases = [
  Expect<
    Equal<
      TupleToObject<typeof tuple>,
      { tesla: "tesla"; "model 3": "model 3"; "model X": "model X"; "model Y": "model Y" }
    >
  >,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<Equal<TupleToObject<typeof tupleMix>, { 1: 1; "2": "2"; 3: 3; "4": "4" }>>
];

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>;
```

## 01-index-access

<a href="https://www.youtube.com/watch?v=plsnFfbqVEo" target="_blank"><img src="https://img.shields.io/badge/-YouTube explanation-c4302b" alt="YouTube"/></a>
<a href="./examples/01-index-access" target="_blank"><img src="https://img.shields.io/badge/-Code-d9901a" alt="Code"/></a>
<br />
<br />

```ts
interface ColorVariants {
  primary: "blue";
  secondary: "red";
  tertiary: "green";
}

type PrimaryColor = ColorVariants["primary"]; // type PrimaryColor = "blue"
type NonPrimaryColor = ColorVariants["secondary" | "tertiary"]; // type NonPrimaryColor = "red" | "green"
type EveryColor = ColorVariants[keyof ColorVariants]; // type EveryColor = "blue" | "red" | "green"

type Letters = ["a", "b", "c"];

type AOrB = Letters[0 | 1]; // type AOrB = "a" | "b";
type Letter = Letters[number]; // type Letter = "a" | "b" | "c";

interface UserRoleConfig {
  user: ["view", "create", "update"];
  superAdmin: ["view", "create", "update", "delete"];
}

type Role = UserRoleConfig[keyof UserRoleConfig][number]; // type Role = "view" | "create" | "update" | "delete"
```

## 02-operating-on-object-keys

<a href="https://www.youtube.com/watch?v=PEQn1a6xOHc" target="_blank"><img src="https://img.shields.io/badge/-YouTube explanation-c4302b" alt="YouTube"/></a>
<a href="./examples/02-operating-on-object-keys" target="_blank"><img src="https://img.shields.io/badge/-Code-d9901a" alt="Code"/></a>
<br />
<br />

```ts
type RemoveMaps<T> = T extends `maps:${infer U}` ? U : T;

interface ApiData {
  "maps:longitude": string;
  "maps:latitude": string;
  awesome: boolean;
}

type RemoveMapsFromObj<T> = {
  [K in keyof T as RemoveMaps<K>]: T[K];
};

type DesiredShape = RemoveMapsFromObj<ApiData>;

// type DesiredShape = {
//   longitude: string;
//   latitude: string;
//   awesome: boolean;
// }
```

## 03-loose-autocomplete-react

<a href="https://www.youtube.com/watch?v=a_m7jxrTlaw" target="_blank"><img src="https://img.shields.io/badge/-YouTube explanation-c4302b" alt="YouTube"/></a>
<a href="./examples/03-loose-autocomplete-react" target="_blank"><img src="https://img.shields.io/badge/-Code-d9901a" alt="Code"/></a>
<br />
<br />

```ts
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
```

## 04-readonly

<a href="https://www.youtube.com/watch?v=U1EygIpjAEM" target="_blank"><img src="https://img.shields.io/badge/-YouTube explanation-c4302b" alt="YouTube"/></a>
<a href="./examples/04-readonly" target="_blank"><img src="https://img.shields.io/badge/-Code-d9901a" alt="Code"/></a>
<br />
<br />
Implement the built-in `Readonly<T>` generic without using it.

Constructs a type with all properties of T set to readonly, meaning the properties of the constructed type cannot be reassigned.

```ts
interface Todo {
  title: string;
  description: string;
}

interface Todo2 {
  title: string;
  description: string;
  address: {
    street: string;
    houseNumber: number;
  };
}

type MyReadonly<TInput> = {
  readonly [Key in keyof TInput]: TInput[Key];
};

type MyResult = MyReadonly<Todo2>;

// type MyResult = {
//   readonly title: string;
//   readonly description: string;
//   readonly address: {
//       street: string;
//       houseNumber: number;
//   };
// }

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar",
};

// @ts-expect-error
todo.title = "Hello"; // Error: cannot reassign a readonly property
// @ts-expect-error
todo.description = "barFoo"; // Error: cannot reassign a readonly property
```

## 05-dynamic-function-arguments

<a href="https://www.youtube.com/watch?v=YE_3WwX-Dl8" target="_blank"><img src="https://img.shields.io/badge/-YouTube explanation-c4302b" alt="YouTube"/></a>
<a href="./examples/05-dynamic-function-arguments" target="_blank"><img src="https://img.shields.io/badge/-Code-d9901a" alt="Code"/></a>
<br />
<br />

```ts
export type Event =
  | {
      type: "LOG_IN";
      payload: {
        userId: string;
      };
    }
  | {
      type: "SIGN_OUT";
    };

const sendEvent = <Type extends Event["type"]>(
  ...args: Extract<Event, { type: Type }> extends { payload: infer TPayload }
    ? [type: Type, payload: TPayload]
    : [type: Type]
) => {};

/**
 * Correct
 */
sendEvent("SIGN_OUT");
sendEvent("LOG_IN", { userId: "123" });

/**
 * Should error
 */
sendEvent("SIGN_OUT", {});
sendEvent("LOG_IN", { userId: 123 });
sendEvent("LOG_IN", {});
sendEvent("LOG_IN", {});
```

## 06-tuple-length

<a href="https://www.youtube.com/watch?v=iNs_z-vsfVM" target="_blank"><img src="https://img.shields.io/badge/-YouTube explanation-c4302b" alt="YouTube"/></a>
<a href="./examples/06-tuple-length" target="_blank"><img src="https://img.shields.io/badge/-Code-d9901a" alt="Code"/></a>
<br />
<br />
For given a tuple, you need create a generic `Length`, pick the length of the tuple

```ts
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
```

## 07-first-of-array

<a href="https://www.youtube.com/watch?v=dZWJrjzqvv8" target="_blank"><img src="https://img.shields.io/badge/-YouTube explanation-c4302b" alt="YouTube"/></a>
<a href="./examples/07-first-of-array" target="_blank"><img src="https://img.shields.io/badge/-Code-d9901a" alt="Code"/></a>
<br />
<br />
Implement a generic `First<T>` that takes an Array `T` and returns it's first element's type.

```ts
type First<TArray extends any[]> = TArray extends [infer TFirst, ...any[]] ? TFirst : never;

type Result = First<["a", "b"]>;

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
```

## 08-easy-pick

<a href="https://www.youtube.com/watch?v=knOgB-Aa8Pc" target="_blank"><img src="https://img.shields.io/badge/-YouTube explanation-c4302b" alt="YouTube"/></a>
<a href="./examples/08-easy-pick" target="_blank"><img src="https://img.shields.io/badge/-Code-d9901a" alt="Code"/></a>
<br />
<br />
Implement the built-in `Pick<T, K>` generic without using it.

Constructs a type by picking the set of properties `K` from `T`

```ts
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
```

## 09-modules-into-types

<a href="https://www.youtube.com/watch?v=sswUBXaoXSI" target="_blank"><img src="https://img.shields.io/badge/-YouTube explanation-c4302b" alt="YouTube"/></a>
<a href="./examples/09-modules-into-types" target="_blank"><img src="https://img.shields.io/badge/-Code-d9901a" alt="Code"/></a>
<br />
<br />

```ts
export type ActionModule = typeof import("./constants");

export type Action = ActionModule[keyof ActionModule]; // "ADD_TODO" | "REMOVE_TODO" | "EDIT_TODO";
```
