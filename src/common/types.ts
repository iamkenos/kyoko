/** @see [RecursivePartial](https://stackoverflow.com/a/51365037/2285470) */
export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

export type KeyValuePair = { key: string; value: string };
