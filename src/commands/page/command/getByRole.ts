import { Locator as LocatorClass } from "@commands/locator/locator";

import type { Page as PlaywrightPageType } from "@playwright/test";
import type { Page } from "@commands/page/types";
import type { Locator } from "@commands/locator/types";

export function getByRole(this: Page, ...args: Parameters<PlaywrightPageType["getByRole"]>) {
  const locator = this.mainFrame().getByRole(...args);
  return new LocatorClass(locator) as Locator;
}
