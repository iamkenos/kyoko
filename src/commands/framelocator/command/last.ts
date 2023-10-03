import { FrameLocator as FrameLocatorClass } from "@commands/framelocator/framelocator";

import type { FrameLocator as PlaywrightFrameLocatorType } from "@playwright/test";
import type { FrameLocator } from "@commands/framelocator/types";

export function last(this: FrameLocator, ...args: Parameters<PlaywrightFrameLocatorType["last"]>) {
  return new FrameLocatorClass(this.__proto.last(...args)) as FrameLocator;
}
