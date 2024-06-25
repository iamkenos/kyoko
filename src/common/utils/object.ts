/** https://stackoverflow.com/a/56204398/2285470 */
export function deepSearch(object: any, key: string, value: any) {
  let result = undefined;
  JSON.stringify(object, (_, nestedValue) => {
    if (nestedValue && nestedValue[key] === value) {
      result = nestedValue;
    }
    return nestedValue;
  });
  return result;
}
