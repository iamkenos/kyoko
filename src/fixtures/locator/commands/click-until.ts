import type { Locator, PlaywrightLocator } from "@fixtures/locator/types";
import type { ExpectedConditions } from "@conditions/types";

export async function clickUntil(this: Locator, conditions: ExpectedConditions, ...args: Parameters<PlaywrightLocator["click"]>) {
  const fn = async() => await this.click(...args);
  await this.doUntil(fn, conditions.setName(clickUntil.name));
}

export type ClickUntilCommand = typeof clickUntil;
