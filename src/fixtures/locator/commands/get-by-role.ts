import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { Locator, PlaywrightLocator } from "@fixtures/locator/types";

export function getByRole(this: Locator, ...args: Parameters<PlaywrightLocator["getByRole"]>) {
  return new LocatorClass(this.__proto.getByRole(...args)) as Locator;
}
