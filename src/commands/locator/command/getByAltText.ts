import { Locator as LocatorClass } from "@commands/locator/locator";

import type { Locator as PlaywrightLocatorType } from "@playwright/test";
import type { Locator } from "@commands/locator/types";

export function getByAltText(this: Locator, ...args: Parameters<PlaywrightLocatorType["getByAltText"]>) {
  return new LocatorClass(this.__proto.getByAltText(...args)) as Locator;
}
