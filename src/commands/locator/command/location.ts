import type { Locator } from "@commands/locator/types";

/**
 * Gets element location relative to the top of the document
 * @see https://stackoverflow.com/a/51283627/2285470
 */
export async function location(this: Locator) {
  const box = await this.boundingBox();
  const body = await this.evaluate(() => document.body.getBoundingClientRect()) as { x: number, y: number };
  const x = Math.round((box.x - body.x) * 100) / 100;
  const y = Math.round((box.y - body.y) * 100) / 100;
  return { x, y };
}

