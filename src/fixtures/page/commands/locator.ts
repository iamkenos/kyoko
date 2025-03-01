import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { Page as PlaywrightPage } from "@playwright/test";
import type { Page } from "@fixtures/page/types";
import type { Locator } from "@fixtures/locator/types";

export function locator(this: Page, ...args: Parameters<PlaywrightPage["locator"]>) {
  const from = this.activeFrame ? this.activeFrame.locator(...args) : this.__proto.locator(...args);
  return new LocatorClass(this["getLocatorFrom"](from)) as Locator;
}

export type LocatorCommand = typeof locator;
