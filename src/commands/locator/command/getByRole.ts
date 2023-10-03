import { Locator as LocatorClass } from "@commands/locator/locator";

import type { Locator as PlaywrightLocatorType } from "@playwright/test";
import type { Locator } from "@commands/locator/types";

export function getByRole(this: Locator, ...args: Parameters<PlaywrightLocatorType["getByRole"]>) {
  return new LocatorClass(this.__proto.getByRole(...args)) as Locator;
}
