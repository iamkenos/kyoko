import { FrameLocator as FrameLocatorClass } from "@commands/frame/frame";

import type { Page as PlaywrightPageType } from "@playwright/test";
import type { FrameLocator } from "@commands/frame/types";
import type { Page } from "@commands/page/types";

export function frameLocator(this: Page, ...args: Parameters<PlaywrightPageType["frameLocator"]>) {
  const from = this.activeframe ? this.activeframe.frameLocator(...args) : this["__proto"].frameLocator(...args);
  return new FrameLocatorClass(this["getLocatorSearchLimit"](from)) as FrameLocator;
}
