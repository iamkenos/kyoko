import { FrameLocator as FrameLocatorClass } from "@commands/frame/frame";

import type { FrameLocator as PlaywrightFrameLocatorType } from "@playwright/test";
import type { FrameLocator } from "@commands/frame/types";

export function nth(this: FrameLocator, ...args: Parameters<PlaywrightFrameLocatorType["nth"]>) {
  return new FrameLocatorClass(this["__proto"].nth(...args)) as FrameLocator;
}
