import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { FrameLocator as PlaywrightFrameLocator } from "@playwright/test";
import type { FrameLocator } from "@fixtures/frame/types";
import type { Locator } from "@fixtures/locator/types";

export function getByAltText(this: FrameLocator, ...args: Parameters<PlaywrightFrameLocator["getByAltText"]>) {
  return new LocatorClass(this.__proto.getByAltText(...args)) as Locator;
}

export type GetByAltTextCommand = typeof getByAltText;
