import type { Page } from "@fixtures/page/types";

export async function switchToFrame(this: Page, selector?: string) {
  this.activeFrame = selector ? this.frameLocator(selector) : undefined;
}
