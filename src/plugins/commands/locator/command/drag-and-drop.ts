import type { Locator } from "playwright";
import type { Component } from "@plugins/fixture/component/component.fixture";

export async function dragAndDrop(this: Locator, target: Locator | Component) {
  const page = this.page();
  await this.hoverIntoView();
  await page.mouse.down();

  await target.hoverIntoView();
  await page.mouse.up();
}
