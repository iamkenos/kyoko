import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { FrameLocator as PlaywrightFrameLocator } from "@playwright/test";
import type { FrameLocator } from "@fixtures/frame/types";
import type { Locator } from "@fixtures/locator/types";

export function getByText(this: FrameLocator, ...args: Parameters<PlaywrightFrameLocator["getByText"]>) {
  return new LocatorClass(this.__proto.getByText(...args)) as Locator;
}

export type GetByTextCommand = typeof getByText;
