import { Locator as LocatorClass } from "@commands/locator/locator";

import type { Page as PlaywrightPageType } from "@playwright/test";
import type { Page } from "@commands/page/types";
import type { Locator } from "@commands/locator/types";

export function getByTestId(this: Page, ...args: Parameters<PlaywrightPageType["getByTestId"]>) {
  const from = this.activeframe ? this.activeframe.getByTestId(...args) : this["__proto"].getByTestId(...args);
  return new LocatorClass(this["getLocatorSearchLimit"](from)) as Locator;
}
