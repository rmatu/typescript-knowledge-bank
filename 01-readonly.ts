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

todo.title = "Hello"; // Error: cannot reassign a readonly property
todo.description = "barFoo"; // Error: cannot reassign a readonly property
