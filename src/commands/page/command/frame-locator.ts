import { FrameLocator as FrameLocatorClass } from "@commands/frame/frame";

import type { Page as PlaywrightPageType } from "@playwright/test";
import type { FrameLocator } from "@commands/frame/types";
import type { Page } from "@commands/page/types";

export function frameLocator(this: Page, ...args: Parameters<PlaywrightPageType["frameLocator"]>) {
  const locator = this.mainFrame().frameLocator(...args);
  return new FrameLocatorClass(locator) as FrameLocator;
}
