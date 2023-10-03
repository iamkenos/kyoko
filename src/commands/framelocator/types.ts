import type { FrameLocator as PlaywrightFrameLocatorType } from "@playwright/test";
import type { FrameLocator as FrameLocatorClassType } from "./framelocator";
import type { locator } from "./command/locator";

export interface FrameLocator extends PlaywrightFrameLocatorType, FrameLocatorClassType {
  locator: typeof locator;
}
