import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { Page as PlaywrightPage } from "@playwright/test";
import type { Page } from "@fixtures/page/types";
import type { Locator } from "@fixtures/locator/types";

export function getByPlaceholder(this: Page, ...args: Parameters<PlaywrightPage["getByPlaceholder"]>) {
  const from = this.activeFrame ? this.activeFrame.getByPlaceholder(...args) : this.__proto.getByPlaceholder(...args);
  return new LocatorClass(this["getLocatorFrom"](from)) as Locator;
}

export type GetByPlaceholderCommand = typeof getByPlaceholder;
