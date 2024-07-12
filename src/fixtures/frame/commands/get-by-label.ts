import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { FrameLocator as PlaywrightFrameLocator } from "@playwright/test";
import type { FrameLocator } from "@fixtures/frame/types";
import type { Locator } from "@fixtures/locator/types";

export function getByLabel(this: FrameLocator, ...args: Parameters<PlaywrightFrameLocator["getByLabel"]>) {
  return new LocatorClass(this.__proto.getByLabel(...args)) as Locator;
}
