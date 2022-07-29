# Knowledge bank on advanced TypeScript

## Knowledge gained from

- Matt Pocock: https://www.mattpocock.com/
- Contributors of: https://github.com/type-challenges/type-challenges

## Description

- [00-easy-pick](#00-easy-pick)
- [01-readonly](#01-readonly)
- [02-operating-on-object-keys](#02-operating-on-object-keys)
- [03-loose-autocomplete-react](#03-loose-autocomplete-react)
- [04-index-access](#04-index-access)
- [05-dynamic-function-arguments](05-dynamic-function-arguments)
- [06-tuple-length](#06-tuple-length)
- [07-first-of-array](#07-first-of-array)
- [08-tuple-to-object](#08-tuple-to-object)

## 00-easy-pick

Implement the built-in `Pick<T, K>` generic without using it.

Constructs a type by picking the set of properties `K` from `T`

For example:

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = MyPick<Todo, "title" | "completed">;
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```

## 01-readonly

Implement the built-in `Readonly<T>` generic without using it.

Constructs a type with all properties of T set to readonly, meaning the properties of the constructed type cannot be reassigned.

For example:

```ts
interface Todo {
  title: string;
  description: string;
}
const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar",
};
todo.title = "Hello"; // Error: cannot reassign a readonly property
todo.description = "barFoo"; // Error: cannot reassign a readonly property
```

## 02-operating-on-object-keys

```ts
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

type RemoveMaps<T> = T extends `maps:${infer U}` ? U : T;
```

## 03-loose-autocomplete-react

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

## 04-index-access

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

## 05-dynamic-function-arguments

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

For given a tuple, you need create a generic `Length`, pick the length of the tuple

For example:

```ts
type tesla = ["tesla", "model 3", "model X", "model Y"];
type spaceX = ["FALCON 9", "FALCON HEAVY", "DRAGON", "STARSHIP", "HUMAN SPACEFLIGHT"];
type teslaLength = Length<tesla>; // expected 4
type spaceXLength = Length<spaceX>; // expected 5
```

## 07-first-of-array

Implement a generic `First<T>` that takes an Array `T` and returns it's first element's type.

For example:

```ts
type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];
type head1 = First<arr1>; // expected to be 'a'
type head2 = First<arr2>; // expected to be 3
```

## 08-tuple-to-object

Give an array, transform into an object type and the key/value must in the given array.

For example:

```ts
const tuple = ["tesla", "model 3", "model X", "model Y"] as const;
type result = TupleToObject<typeof tuple>; // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
```
