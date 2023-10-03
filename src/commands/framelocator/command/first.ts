import { FrameLocator as FrameLocatorClass } from "@commands/framelocator/framelocator";

import type { FrameLocator as PlaywrightFrameLocatorType } from "@playwright/test";
import type { FrameLocator } from "@commands/framelocator/types";

export function first(this: FrameLocator, ...args: Parameters<PlaywrightFrameLocatorType["first"]>) {
  return new FrameLocatorClass(this.__proto.first(...args)) as FrameLocator;
}
