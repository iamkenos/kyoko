import type { Component } from "@fixtures/component/component";
import type { Locator } from "@fixtures/locator/types";

export async function centerPoint(this: Locator | Component) {
  const box = await this.boundingBox();
  const x = Math.round((box.x + (box.width / 2)) * 100) / 100;
  const y = Math.round((box.y + (box.height / 2)) * 100) / 100;
  return { x, y };
}

export type CenterPointCommand = typeof centerPoint;
