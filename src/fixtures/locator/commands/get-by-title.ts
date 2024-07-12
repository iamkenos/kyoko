import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { Locator, PlaywrightLocator } from "@fixtures/locator/types";

export function getByTitle(this: Locator, ...args: Parameters<PlaywrightLocator["getByTitle"]>) {
  return new LocatorClass(this.__proto.getByTitle(...args)) as Locator;
}
