import type { Page } from "@commands/page/types";

export async function switchToFrame(this: Page, selector?: string) {
  this.activeframe = selector ? this.frameLocator(selector) : undefined;
}
