import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { Locator, PlaywrightLocator } from "@fixtures/locator/types";

export function locator(this: Locator, ...args: Parameters<PlaywrightLocator["locator"]>) {
  return new LocatorClass(this.__proto.locator(...args)) as Locator;
}

export type LocatorCommand = typeof locator;
