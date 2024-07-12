import { FrameLocator as FrameLocatorClass } from "@fixtures/frame/frame";

import type { FrameLocator as PlaywrightFrameLocator } from "@playwright/test";
import type { FrameLocator } from "@fixtures/frame/types";

export function frameLocator(this: FrameLocator, ...args: Parameters<PlaywrightFrameLocator["frameLocator"]>) {
  return new FrameLocatorClass(this.__proto.frameLocator(...args)) as FrameLocator;
}
