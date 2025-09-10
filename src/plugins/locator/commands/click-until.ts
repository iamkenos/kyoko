import type { Locator } from "playwright";
import type { ExpectedConditions } from "@conditions/types";
import type { WebComponent } from "@core/fixtures/web-component.fixture";

export async function clickUntil(this: Locator | WebComponent, conditions: ExpectedConditions, ...args: Parameters<Locator["click"]>) {
  const fn = async() => await this.click(...args);
  await this.doUntil(fn, conditions.setName(clickUntil.name));
}
