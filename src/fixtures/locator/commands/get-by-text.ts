import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { Locator, PlaywrightLocator } from "@fixtures/locator/types";

export function getByText(this: Locator, ...args: Parameters<PlaywrightLocator["getByText"]>) {
  return new LocatorClass(this.__proto.getByText(...args)) as Locator;
}
