import { Locator as LocatorClass } from "@commands/locator/locator";

import type { Locator as PlaywrightLocatorType } from "@playwright/test";
import type { Locator } from "@commands/locator/types";

export function getByTestId(this: Locator, ...args: Parameters<PlaywrightLocatorType["getByTestId"]>) {
  return new LocatorClass(this["__proto"].getByTestId(...args)) as Locator;
}
