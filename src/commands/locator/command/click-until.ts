import type { Locator as PlaywrightLocatorType } from "@playwright/test";
import type { Locator } from "@commands/locator/types";
import type { ExpectedConditions } from "@conditions/types";

export async function clickUntil(this: Locator, conditions: ExpectedConditions, ...args: Parameters<PlaywrightLocatorType["click"]>) {
  const fn = async() => await this.click(...args);
  await this.doUntil(fn, conditions.setName(clickUntil.name));
}

