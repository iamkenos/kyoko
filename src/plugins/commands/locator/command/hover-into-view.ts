import type { Locator } from "playwright";
import type { Component } from "@plugins/fixture/component/component.fixture";

export async function hoverIntoView(this: Locator | Component, options?: { position?: { x: number, y: number } }) {
  const hasOffset = options?.position;
  const page = this.page();
  await this.scrollIntoView();

  let x: number, y: number;
  const center = await this.centerPoint();
  if (hasOffset) {
    x = options.position.x + center.x;
    y = options.position.y + center.y;
  } else {
    x = center.x;
    y = center.y;
  }

  await page.mouse.move(x, y);
}
