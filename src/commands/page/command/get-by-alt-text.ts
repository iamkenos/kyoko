import { Locator as LocatorClass } from "@commands/locator/locator";

import type { Page as PlaywrightPageType } from "@playwright/test";
import type { Page } from "@commands/page/types";
import type { Locator } from "@commands/locator/types";

export function getByAltText(this: Page, ...args: Parameters<PlaywrightPageType["getByAltText"]>) {
  const from = this.activeframe ? this.activeframe.getByAltText(...args) : this.__proto.getByAltText(...args);
  return new LocatorClass(from) as Locator;
}
