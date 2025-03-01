import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { Locator, PlaywrightLocator } from "@fixtures/locator/types";

export function filter(this: Locator, ...args: Parameters<PlaywrightLocator["filter"]>) {
  return new LocatorClass(this.__proto.filter(...args)) as Locator;
}

export type FilterCommand = typeof filter;
