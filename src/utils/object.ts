/** https://stackoverflow.com/a/56204398/2285470 */
export function deepSearch(object: object, key: string, value: any) {
  let result = undefined;
  JSON.stringify(object, (_, nestedValue) => {
    if (nestedValue && nestedValue[key] === value) {
      result = nestedValue;
    }
    return nestedValue;
  });
  return result;
}

export function valueOf<T = string>(object: object, key: string, fallback?: any) {
  const value = object[key] ?? fallback;

  if (value === undefined) throw new Error(`Unable to find property '${key}' from ${JSON.stringify(object, null, 2)}.`);
  return value as T;
}

/** https://stackoverflow.com/a/31055217/2285470 */
export function propertiesOf(...source: object[]) {
  const props = [];
  for (let i = 0; i < source.length; i++) {
    let obj = source[i];
    do {
      props.push(...Object.getOwnPropertyNames(obj));
    } while ((obj = Object.getPrototypeOf(obj)));
  }

  return Array.from(new Set<string>(props.sort().filter((e, i, arr) => { if (e !== arr[i+1]) return true; })));
}
