import type { Locator } from "@fixtures/locator/types";

export async function dragAndDrop(this: Locator, target: Locator) {
  const page = this.page();
  await this.hoverIntoView();
  await page.mouse.down();

  await target.hoverIntoView();
  await page.mouse.up();
}
