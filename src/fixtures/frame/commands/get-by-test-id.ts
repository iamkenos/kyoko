import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { FrameLocator as PlaywrightFrameLocator } from "@playwright/test";
import type { FrameLocator } from "@fixtures/frame/types";
import type { Locator } from "@fixtures/locator/types";

export function getByTestId(this: FrameLocator, ...args: Parameters<PlaywrightFrameLocator["getByTestId"]>) {
  return new LocatorClass(this.__proto.getByTestId(...args)) as Locator;
}
