import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { Locator, PlaywrightLocator } from "@fixtures/locator/types";

export function or(this: Locator, ...args: Parameters<PlaywrightLocator["or"]>) {
  return new LocatorClass(this.__proto.or(...args)) as Locator;
}

export type OrCommand = typeof or;
