import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { Locator, PlaywrightLocator } from "@fixtures/locator/types";

export function last(this: Locator, ...args: Parameters<PlaywrightLocator["last"]>) {
  return new LocatorClass(this.__proto.last(...args)) as Locator;
}

export type LastCommand = typeof last;
