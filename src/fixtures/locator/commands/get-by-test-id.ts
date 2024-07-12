import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { Locator, PlaywrightLocator } from "@fixtures/locator/types";

export function getByTestId(this: Locator, ...args: Parameters<PlaywrightLocator["getByTestId"]>) {
  return new LocatorClass(this.__proto.getByTestId(...args)) as Locator;
}
