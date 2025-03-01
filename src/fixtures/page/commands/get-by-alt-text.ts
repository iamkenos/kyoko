import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { Page as PlaywrightPage } from "@playwright/test";
import type { Page } from "@fixtures/page/types";
import type { Locator } from "@fixtures/locator/types";

export function getByAltText(this: Page, ...args: Parameters<PlaywrightPage["getByAltText"]>) {
  const from = this.activeFrame ? this.activeFrame.getByAltText(...args) : this.__proto.getByAltText(...args);
  return new LocatorClass(this["getLocatorFrom"](from)) as Locator;
}

export type GetByAltTextCommand = typeof getByAltText;
