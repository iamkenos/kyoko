import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { Locator, PlaywrightLocator } from "@fixtures/locator/types";

export function first(this: Locator, ...args: Parameters<PlaywrightLocator["first"]>) {
  return new LocatorClass(this.__proto.first(...args)) as Locator;
}
