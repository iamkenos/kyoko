import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { Page as PlaywrightPage } from "@playwright/test";
import type { Page } from "@fixtures/page/types";
import type { Locator } from "@fixtures/locator/types";

export function getByTitle(this: Page, ...args: Parameters<PlaywrightPage["getByTitle"]>) {
  const from = this.activeFrame ? this.activeFrame.getByTitle(...args) : this.__proto.getByTitle(...args);
  return new LocatorClass(this["getLocatorFrom"](from)) as Locator;
}
