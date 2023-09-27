import type * as playwright from "@playwright/test";

import { Page } from "@generics";
import { Locator } from "../locator";

export function locator(this: Page, ...args: Parameters<playwright.Page["locator"]>) {
  const locator = this.mainFrame().locator(...args);
  const baselocator = new Locator(locator);
  return baselocator;
}
