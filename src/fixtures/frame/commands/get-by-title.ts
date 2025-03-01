import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { FrameLocator as PlaywrightFrameLocator } from "@playwright/test";
import type { FrameLocator } from "@fixtures/frame/types";
import type { Locator } from "@fixtures/locator/types";

export function getByTitle(this: FrameLocator, ...args: Parameters<PlaywrightFrameLocator["getByTitle"]>) {
  return new LocatorClass(this.__proto.getByTitle(...args)) as Locator;
}

export type GetByTitleCommand = typeof getByTitle;
