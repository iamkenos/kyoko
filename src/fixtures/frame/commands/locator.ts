import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { FrameLocator as PlaywrightFrameLocator } from "@playwright/test";
import type { FrameLocator } from "@fixtures/frame/types";
import type { Locator } from "@fixtures/locator/types";

export function locator(this: FrameLocator, ...args: Parameters<PlaywrightFrameLocator["locator"]>) {
  return new LocatorClass(this.__proto.locator(...args)) as Locator;
}
