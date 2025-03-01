import { FrameLocator as FrameLocatorClass } from "@fixtures/frame/frame";

import type { FrameLocator as PlaywrightFrameLocator } from "@playwright/test";
import type { FrameLocator } from "@fixtures/frame/types";

export function nth(this: FrameLocator, ...args: Parameters<PlaywrightFrameLocator["nth"]>) {
  return new FrameLocatorClass(this.__proto.nth(...args)) as FrameLocator;
}

export type NthCommand = typeof nth;
