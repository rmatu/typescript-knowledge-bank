// https://www.youtube.com/watch?v=-rJ2XzQg8Ek

const makeKeyRemover =
  <Key extends string>(keys: Key[]) =>
  <Obj>(obj: Obj): Omit<Obj, Key> => {
    return {} as any;
  };

const keyRemover = makeKeyRemover(["a", "b"]);
const newObject = keyRemover({ a: 1, b: 2, c: 3 });

/**
 * Correct
 */
newObject.c;

/**
 * Should error
 */
//@ts-expect-error
newObject.a;
//@ts-expect-error
newObject.d;
