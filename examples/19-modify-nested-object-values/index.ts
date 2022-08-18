import { DotNestedKeys } from "./types";

const recursiveObjectModify = <T extends Record<string, string | object>>(
  obj: T,
  config?: Config<T>
) => {
  let k: keyof T;
  const { options, defaultOverwrite } = config ?? { defaultOverwrite: "" };

  for (k in obj) {
    if (typeof obj[k] === "object" && obj[k] !== null) {
      recursiveObjectModify(
        obj[k] as Record<string, object>,
        config as Config<Record<string, object>>
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

    obj[k] = defaultOverwrite as T[keyof T];

    if (found) {
      obj[k] = updateV as unknown as T[keyof T];
    }
  }

  return obj;
};

interface Opt<T> {
  key: DotNestedKeys<T>;
  value: unknown;
}

interface Config<T> {
  options?: Opt<T>[];
  defaultOverwrite?: unknown;
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
 * copyAndSetObjectValues(example, {options: [{ key: "a.a1", value: "new value" }]})
 *
 * Will return:
 *
 * { a: { a1: 'new value', a2: '' }, b: '' }
 * @param {T} obj - Object to clone.
 * @param {{ options?: {key: DotNestedKeys<T>, value: unknown}, defaultOverwrite?: unknown }} config - Config object that let you target keys or set defaultOverwrite value
 */
const copyAndSetObjectValues = <T>(obj: T, config?: Config<T>) => {
  return recursiveObjectModify(JSON.parse(JSON.stringify(obj)), config);
};

const example = { a: { a1: "a1", a2: 2 }, b: true };
copyAndSetObjectValues(example, {
  options: [{ key: "a.a1", value: "new value" }],
  defaultOverwrite: "defaultValue",
}); // { a: { a1: 'new value', a2: 'defaultValue' }, b: 'defaultValue' }
