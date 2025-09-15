import type { Locator } from "playwright";

export async function centerPoint(this: Locator) {
  const box = await this.boundingBox();
  const x = Math.round((box.x + (box.width / 2)) * 100) / 100;
  const y = Math.round((box.y + (box.height / 2)) * 100) / 100;
  return { x, y };
}
