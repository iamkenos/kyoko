import type * as playwright from "@playwright/test";

import { Page } from "@generics";
import { BaseLocator } from "@generics/base.locator";

export function locator(this: Page, ...args: Parameters<playwright.Page["locator"]>) {
  const locator = this.mainFrame().locator(...args);
  const baselocator = new BaseLocator(locator);
  return baselocator;
}
