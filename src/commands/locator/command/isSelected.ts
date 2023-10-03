import type { Locator } from "@commands/locator/types";

export async function isSelected(this: Locator) {
  return await this.evaluate((node: HTMLOptionElement) => node.selected) as boolean;
}

