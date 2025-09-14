import type { BrowserContext } from "playwright";

export async function closeOtherPages(this: BrowserContext) {
  let pages = this.pages();
  const main = this.pages().at(0);

  while (pages.length > 1) {
    await this.closeLastPage();
    pages = this.pages();
  }

  return main;
}
