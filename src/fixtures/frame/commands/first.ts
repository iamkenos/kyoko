import { FrameLocator as FrameLocatorClass } from "@fixtures/frame/frame";

import type { FrameLocator as PlaywrightFrameLocator } from "@playwright/test";
import type { FrameLocator } from "@fixtures/frame/types";

export function first(this: FrameLocator, ...args: Parameters<PlaywrightFrameLocator["first"]>) {
  return new FrameLocatorClass(this.__proto.first(...args)) as FrameLocator;
}
