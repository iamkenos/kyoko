import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { Page as PlaywrightPage } from "@playwright/test";
import type { Page } from "@fixtures/page/types";
import type { Locator } from "@fixtures/locator/types";

export function getByText(this: Page, ...args: Parameters<PlaywrightPage["getByText"]>) {
  const from = this.activeFrame ? this.activeFrame.getByText(...args) : this.__proto.getByText(...args);
  return new LocatorClass(this["getLocatorFrom"](from)) as Locator;
}

export type GetByTextCommand = typeof getByText;
