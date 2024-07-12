import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { Page as PlaywrightPage } from "@playwright/test";
import type { Page } from "@fixtures/page/types";
import type { Locator } from "@fixtures/locator/types";

export function getByTestId(this: Page, ...args: Parameters<PlaywrightPage["getByTestId"]>) {
  const from = this.activeFrame ? this.activeFrame.getByTestId(...args) : this.__proto.getByTestId(...args);
  return new LocatorClass(this["getLocatorFrom"](from)) as Locator;
}
