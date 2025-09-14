import type { Page } from "playwright";

export async function scrollToTop(this: Page) {
  await this.evaluate(() => window.scrollTo(0, 0));
}
