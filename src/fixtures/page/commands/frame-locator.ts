import { FrameLocator as FrameLocatorClass } from "@fixtures/frame/frame";

import type { Page as PlaywrightPage } from "@playwright/test";
import type { FrameLocator } from "@fixtures/frame/types";
import type { Page } from "@fixtures/page/types";

export function frameLocator(this: Page, ...args: Parameters<PlaywrightPage["frameLocator"]>) {
  const from = this.activeFrame ? this.activeFrame.frameLocator(...args) : this.__proto.frameLocator(...args);
  return new FrameLocatorClass(this["getLocatorFrom"](from)) as FrameLocator;
}

export type FrameLocatorCommand = typeof frameLocator;
