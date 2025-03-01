import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { Locator, PlaywrightLocator } from "@fixtures/locator/types";

export function getByPlaceholder(this: Locator, ...args: Parameters<PlaywrightLocator["getByPlaceholder"]>) {
  return new LocatorClass(this.__proto.getByPlaceholder(...args)) as Locator;
}

export type GetByPlaceholderCommand = typeof getByPlaceholder;
