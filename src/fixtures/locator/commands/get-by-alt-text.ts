import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { Locator, PlaywrightLocator } from "@fixtures/locator/types";

export function getByAltText(this: Locator, ...args: Parameters<PlaywrightLocator["getByAltText"]>) {
  return new LocatorClass(this.__proto.getByAltText(...args)) as Locator;
}

export type GetByAltTextCommand = typeof getByAltText;
