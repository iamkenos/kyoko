import type { Page } from "@fixtures/page/types";

export async function scrollToBottom(this: Page) {
  await this.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
}

export type ScrollToBottomCommand = typeof scrollToBottom;
