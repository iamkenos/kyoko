import type { Page } from "playwright";

export async function switchToFrame(this: Page, selector?: string) {
  this.context().locator = selector ? this.frameLocator(selector) : undefined;
}
