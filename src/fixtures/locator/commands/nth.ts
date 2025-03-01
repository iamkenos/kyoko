import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { Locator, PlaywrightLocator } from "@fixtures/locator/types";

export function nth(this: Locator, ...args: Parameters<PlaywrightLocator["nth"]>) {
  return new LocatorClass(this.__proto.nth(...args)) as Locator;
}

export type NthCommand = typeof nth;
