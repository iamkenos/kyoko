import { Locator as LocatorClass } from "@commands/locator/locator";

import type { Page as PlaywrightPageType } from "@playwright/test";
import type { Page } from "@commands/page/types";
import type { Locator } from "@commands/locator/types";

export function locator(this: Page, ...args: Parameters<PlaywrightPageType["locator"]>) {
  const from = this.__proto.locator(...args);
  return new LocatorClass(from) as Locator;
}
