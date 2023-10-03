import { FrameLocator as FrameLocatorClass } from "@commands/framelocator/framelocator";

import type { FrameLocator as PlaywrightFrameLocatorType } from "@playwright/test";
import type { FrameLocator } from "@commands/framelocator/types";

export function nth(this: FrameLocator, ...args: Parameters<PlaywrightFrameLocatorType["nth"]>) {
  return new FrameLocatorClass(this.__proto.nth(...args)) as FrameLocator;
}
