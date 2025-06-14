import type { Locator } from "playwright";

export async function customCommandThree(this: Locator) {
  console.log((this as any)._selector);
}
