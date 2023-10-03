import { Locator as LocatorClass } from "@commands/locator/locator";

import type { Locator as PlaywrightLocatorType } from "@playwright/test";
import type { Locator } from "@commands/locator/types";

export function nth(this: Locator, ...args: Parameters<PlaywrightLocatorType["nth"]>) {
  return new LocatorClass(this.__proto.nth(...args)) as Locator;
}
