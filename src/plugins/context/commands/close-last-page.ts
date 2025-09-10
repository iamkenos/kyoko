import type { BrowserContext } from "playwright";

export async function closeLastPage(this: BrowserContext) {
  await this.pages().at(-1)?.close();
  return this.pages().at(0);
}
