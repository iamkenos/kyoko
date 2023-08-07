import { Page } from "@generics";

export async function scrollToBottom(this: Page) {
  await this.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
}

