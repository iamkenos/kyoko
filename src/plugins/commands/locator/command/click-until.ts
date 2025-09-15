import type { Locator } from "playwright";
import type { ExpectedConditions } from "@plugins/conditions/types";

export async function clickUntil(this: Locator, conditions: ExpectedConditions, ...args: Parameters<Locator["click"]>) {
  const fn = async() => await this.click(...args);
  await this.doUntil(fn, conditions.setName(clickUntil.name));
}
