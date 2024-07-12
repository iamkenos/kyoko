import { FrameLocator as FrameLocatorClass } from "@fixtures/frame/frame";

import type { FrameLocator as PlaywrightFrameLocator } from "@playwright/test";
import type { FrameLocator } from "@fixtures/frame/types";

export function last(this: FrameLocator, ...args: Parameters<PlaywrightFrameLocator["last"]>) {
  return new FrameLocatorClass(this.__proto.last(...args)) as FrameLocator;
}
