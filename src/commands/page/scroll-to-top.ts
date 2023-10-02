import { Page } from "@generics";

export async function scrollToTop(this: Page) {
  await this.evaluate(() => window.scrollTo(0, 0));
}

