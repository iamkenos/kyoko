import type { Locator } from "playwright";
import type { WebComponent } from "@core/fixtures/web-component.fixture";

export async function centerPoint(this: Locator | WebComponent) {
  const box = await this.boundingBox();
  const x = Math.round((box.x + (box.width / 2)) * 100) / 100;
  const y = Math.round((box.y + (box.height / 2)) * 100) / 100;
  return { x, y };
}
