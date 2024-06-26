import { FrameLocator as FrameLocatorClass } from "@commands/frame/frame";

import type { FrameLocator as PlaywrightFrameLocatorType } from "@playwright/test";
import type { FrameLocator } from "@commands/frame/types";

export function last(this: FrameLocator, ...args: Parameters<PlaywrightFrameLocatorType["last"]>) {
  return new FrameLocatorClass(this["__proto"].last(...args)) as FrameLocator;
}
