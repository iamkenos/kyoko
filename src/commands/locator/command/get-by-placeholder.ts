import { Locator as LocatorClass } from "@commands/locator/locator";

import type { Locator as PlaywrightLocatorType } from "@playwright/test";
import type { Locator } from "@commands/locator/types";

export function getByPlaceholder(this: Locator, ...args: Parameters<PlaywrightLocatorType["getByPlaceholder"]>) {
  return new LocatorClass(this["__proto"].getByPlaceholder(...args)) as Locator;
}
