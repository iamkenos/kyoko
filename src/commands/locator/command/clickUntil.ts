import type { Locator as PlaywrightLocatorType } from "@playwright/test";
import type { ExpectedConditions } from "@conditions";
import type { Locator } from "@commands/locator/types";

export async function clickUntil(this: Locator, conditions: ExpectedConditions, ...args: Parameters<PlaywrightLocatorType["click"]>) {
  const fn = async() => await this.click(...args);
  await this.doUntil(fn, conditions.setName(clickUntil.name));
}

