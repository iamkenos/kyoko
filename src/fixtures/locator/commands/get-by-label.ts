import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { Locator, PlaywrightLocator } from "@fixtures/locator/types";

export function getByLabel(this: Locator, ...args: Parameters<PlaywrightLocator["getByLabel"]>) {
  return new LocatorClass(this.__proto.getByLabel(...args)) as Locator;
}

export type GetByLabelCommand = typeof getByLabel;
