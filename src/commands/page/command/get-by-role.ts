import { Locator as LocatorClass } from "@commands/locator/locator";

import type { Page as PlaywrightPageType } from "@playwright/test";
import type { Page } from "@commands/page/types";
import type { Locator } from "@commands/locator/types";

export function getByRole(this: Page, ...args: Parameters<PlaywrightPageType["getByRole"]>) {
  const from = this.activeframe ? this.activeframe.getByRole(...args) : this.__proto.getByRole(...args);
  return new LocatorClass(from) as Locator;
}
