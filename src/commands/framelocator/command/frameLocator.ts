import { FrameLocator as FrameLocatorClass } from "@commands/framelocator/framelocator";

import type { FrameLocator as PlaywrightFrameLocatorType } from "@playwright/test";
import type { FrameLocator } from "@commands/framelocator/types";

export function frameLocator(this: FrameLocator, ...args: Parameters<PlaywrightFrameLocatorType["frameLocator"]>) {
  return new FrameLocatorClass(this.__proto.frameLocator(...args)) as FrameLocator;
}
