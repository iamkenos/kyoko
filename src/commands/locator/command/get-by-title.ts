import { Locator as LocatorClass } from "@commands/locator/locator";

import type { Locator as PlaywrightLocatorType } from "@playwright/test";
import type { Locator } from "@commands/locator/types";

export function getByTitle(this: Locator, ...args: Parameters<PlaywrightLocatorType["getByTitle"]>) {
  return new LocatorClass(this.__proto.getByTitle(...args)) as Locator;
}
