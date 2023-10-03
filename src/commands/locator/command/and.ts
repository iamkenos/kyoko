import { Locator as LocatorClass } from "@commands/locator/locator";

import type { Locator as PlaywrightLocatorType } from "@playwright/test";
import type { Locator } from "@commands/locator/types";

export function and(this: Locator, ...args: Parameters<PlaywrightLocatorType["and"]>) {
  return new LocatorClass(this.__proto.and(...args)) as Locator;
}
