// https://www.youtube.com/watch?v=AhzjPAtzGTs

type DeepPartial<T> = T extends Function
  ? T
  : T extends Array<infer InferredArrayMember>
  ? DeepPartialArray<InferredArrayMember>
  : T extends object
  ? DeepPartialObject<T>
  : T | undefined;

interface DeepPartialArray<T> extends Array<DeepPartial<T>> {}

type DeepPartialObject<T> = {
  [Key in keyof T]?: DeepPartial<T[Key]>;
};

interface Post {
  id: string;
  comments: { value: string }[];
  meta: {
    name: string;
    description: string;
  };
}

const post: DeepPartial<Post> = {
  id: "1",
  meta: {
    description: "123",
  },
};

/**
 * TypeScript Partial works only 1 level deep
 */
const secondPost: Partial<Post> = {
  id: "1",
  //@ts-expect-error
  meta: {
    description: "123",
  },
};
