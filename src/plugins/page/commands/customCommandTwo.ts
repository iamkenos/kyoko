import type { Page } from "playwright";

/** hey ho */
export async function customCommandTwo(this: Page, foo: string) {
  console.log(foo);
  return foo;
}
