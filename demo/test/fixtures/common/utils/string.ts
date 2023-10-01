export function isURL(str: string) {
  try {
    const url = new URL(str);
    return ["http:", "https:"].includes(url.protocol);
  } catch (e) {
    return false;
  }
}

export function isJSON(str: string) {
  if (typeof str !== "string") return false;
  try {
    const result = JSON.parse(str);
    return result instanceof Array || result instanceof Object;
  } catch (e) {
    return false;
  }
}
