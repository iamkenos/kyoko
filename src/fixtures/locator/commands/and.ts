import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { Locator, PlaywrightLocator } from "@fixtures/locator/types";

export function and(this: Locator, ...args: Parameters<PlaywrightLocator["and"]>) {
  return new LocatorClass(this.__proto.and(...args)) as Locator;
}

export type AndCommand = typeof and;
