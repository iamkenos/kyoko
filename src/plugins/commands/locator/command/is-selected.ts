import type { Locator } from "playwright";

export async function isSelected(this: Locator) {
  return await this.evaluate((node: HTMLOptionElement) => node.selected) as boolean;
}
