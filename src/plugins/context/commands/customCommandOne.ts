import type { BrowserContext } from "playwright";

export async function customCommandOne(this: BrowserContext) {
  console.log(customCommandOne.name);
}
