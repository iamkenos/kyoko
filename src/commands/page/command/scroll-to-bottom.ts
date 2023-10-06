import type { Page } from "@commands/page/types";

export async function scrollToBottom(this: Page) {
  await this.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
}

