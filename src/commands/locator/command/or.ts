import { Locator as LocatorClass } from "@commands/locator/locator";

import type { Locator as PlaywrightLocatorType } from "@playwright/test";
import type { Locator } from "@commands/locator/types";

export function or(this: Locator, ...args: Parameters<PlaywrightLocatorType["or"]>) {
  return new LocatorClass(this["__proto"].or(...args)) as Locator;
}
