import type { Page } from "@fixtures/page/types";

export async function scrollTo(this: Page, target: { x: number, y: number }) {
  await this.evaluate((target) => window.scrollTo(target.x, target.y), target);
}

export type ScrollToCommand = typeof scrollTo;
