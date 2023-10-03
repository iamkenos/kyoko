import { Locator as LocatorClass } from "@commands/locator/locator";

import type { Locator as PlaywrightLocatorType } from "@playwright/test";
import type { Locator } from "@commands/locator/types";

export function last(this: Locator, ...args: Parameters<PlaywrightLocatorType["last"]>) {
  return new LocatorClass(this.__proto.last(...args)) as Locator;
}
