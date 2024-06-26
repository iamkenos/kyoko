import { Locator as LocatorClass } from "@commands/locator/locator";

import type { Locator as PlaywrightLocatorType } from "@playwright/test";
import type { Locator } from "@commands/locator/types";

export function first(this: Locator, ...args: Parameters<PlaywrightLocatorType["first"]>) {
  return new LocatorClass(this["__proto"].first(...args)) as Locator;
}
