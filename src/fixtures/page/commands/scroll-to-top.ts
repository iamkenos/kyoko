import type { Page } from "@fixtures/page/types";

export async function scrollToTop(this: Page) {
  await this.evaluate(() => window.scrollTo(0, 0));
}

export type ScrollToTopCommand = typeof scrollToTop;
