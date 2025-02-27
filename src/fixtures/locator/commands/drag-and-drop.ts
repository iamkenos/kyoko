import type { Locator } from "@fixtures/locator/types";
import type { Component } from "@fixtures/component/component";

export async function dragAndDrop(this: Locator, target: Locator | Component) {
  const page = this.page();
  await this.hoverIntoView();
  await page.mouse.down();

  await target.hoverIntoView();
  await page.mouse.up();
}
