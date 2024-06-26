import { Locator as LocatorClass } from "@commands/locator/locator";

import type { FrameLocator as PlaywrightFrameLocatorType } from "@playwright/test";
import type { FrameLocator } from "@commands/frame/types";
import type { Locator } from "@commands/locator/types";

export function getByRole(this: FrameLocator, ...args: Parameters<PlaywrightFrameLocatorType["getByRole"]>) {
  return new LocatorClass(this["__proto"].getByRole(...args)) as Locator;
}
