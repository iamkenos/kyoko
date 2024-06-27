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
