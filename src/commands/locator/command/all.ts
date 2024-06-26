import { Locator as LocatorClass } from "@commands/locator/locator";

import type { Locator as PlaywrightLocatorType } from "@playwright/test";
import type { Locator } from "@commands/locator/types";

export async function all(this: Locator, ...args: Parameters<PlaywrightLocatorType["all"]>) {
  const all = await this["__proto"].all(...args);
  return all.map(locator => new LocatorClass(locator)) as Locator[];
}
