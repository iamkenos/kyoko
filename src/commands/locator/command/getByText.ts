import { Locator as LocatorClass } from "@commands/locator/locator";

import type { Locator as PlaywrightLocatorType } from "@playwright/test";
import type { Locator } from "@commands/locator/types";

export function getByText(this: Locator, ...args: Parameters<PlaywrightLocatorType["getByText"]>) {
  return new LocatorClass(this.__proto.getByText(...args)) as Locator;
}
