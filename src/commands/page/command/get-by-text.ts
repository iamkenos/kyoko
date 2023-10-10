import { Locator as LocatorClass } from "@commands/locator/locator";

import type { Page as PlaywrightPageType } from "@playwright/test";
import type { Page } from "@commands/page/types";
import type { Locator } from "@commands/locator/types";

export function getByText(this: Page, ...args: Parameters<PlaywrightPageType["getByText"]>) {
  const from = this.activeframe ? this.activeframe.getByText(...args) : this.__proto.getByText(...args);
  return new LocatorClass(from) as Locator;
}
