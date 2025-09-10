import type { Page } from "playwright";

export async function switchToFrame(this: Page, selector?: string) {
  this.activeFrame = selector ? this.frameLocator(selector) : undefined;
}
