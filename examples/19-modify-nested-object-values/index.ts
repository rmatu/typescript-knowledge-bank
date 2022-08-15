import { DotNestedKeys } from "./types";

const recursiveObjectModify = <T extends Record<string, string | object>>(
  obj: T,
  defaultOverwrite: unknown,
  options?: Opt<T>[]
) => {
  let k: keyof T;

  for (k in obj) {
    if (typeof obj[k] === "object" && obj[k] !== null) {
      recursiveObjectModify(
        obj[k] as Record<string, object>,
        defaultOverwrite,
        options as Opt<Record<string, object>>[]
      );
      continue;
    }

    let updateV;
    const found = options?.find(({ key, value }) => {
      const index = key.lastIndexOf(".");
      const currKey = key.slice(index + 1);

      if (k === currKey) {
        updateV = value;
        return true;
      }
    });

    obj[k] = (defaultOverwrite ?? "") as T[keyof T];

    if (found && updateV) {
      obj[k] = updateV as T[keyof T];
    }
  }

  return obj;
};

interface Opt<T> {
  key: DotNestedKeys<T>;
  value: unknown;
}

/**
 * Clones object and sets all key values to empty string "".
 *
 * If you want to overwrite value of object's key, you can pass an array of option objects
 * that consists of key - which targets the value you want to modify, and a value that modifies the value
 *
 * For example:
 *
 * const example = { a: { a1: "a1", a2: 2 }, b: true };
 *
 * prepareInitialDataObj(a, [{ key: "a.a1", value: "new value" }])
 *
 * Will return:
 *
 * { a: { a1: 'new value', a2: '' }, b: '' }
 * @param {T} obj - Object to clone.
 * @param {DotNestedKeys<T>[]} options - Array of option objects
 * @param {unknown} defaultOverwrite - Default value you want to overwrite the object values
 */
const prepareInitialDataObj = <T>(obj: T, options?: Opt<T>[], defaultOverwrite: unknown = "") => {
  return recursiveObjectModify(JSON.parse(JSON.stringify(obj)), defaultOverwrite, options);
};

const example = { a: { a1: "a1", a2: 2 }, b: true };
prepareInitialDataObj(example, [{ key: "a.a1", value: "new value" }]); // { a: { a1: 'new value', a2: '' }, b: '' }
