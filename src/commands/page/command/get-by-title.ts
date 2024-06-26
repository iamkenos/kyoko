import { Locator as LocatorClass } from "@commands/locator/locator";

import type { Page as PlaywrightPageType } from "@playwright/test";
import type { Page } from "@commands/page/types";
import type { Locator } from "@commands/locator/types";

export function getByTitle(this: Page, ...args: Parameters<PlaywrightPageType["getByTitle"]>) {
  const from = this.activeframe ? this.activeframe.getByTitle(...args) : this["__proto"].getByTitle(...args);
  return new LocatorClass(from) as Locator;
}
