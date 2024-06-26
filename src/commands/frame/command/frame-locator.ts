import { FrameLocator as FrameLocatorClass } from "@commands/frame/frame";

import type { FrameLocator as PlaywrightFrameLocatorType } from "@playwright/test";
import type { FrameLocator } from "@commands/frame/types";

export function frameLocator(this: FrameLocator, ...args: Parameters<PlaywrightFrameLocatorType["frameLocator"]>) {
  return new FrameLocatorClass(this["__proto"].frameLocator(...args)) as FrameLocator;
}
