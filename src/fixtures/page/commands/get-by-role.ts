import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { Page as PlaywrightPage } from "@playwright/test";
import type { Page } from "@fixtures/page/types";
import type { Locator } from "@fixtures/locator/types";

export function getByRole(this: Page, ...args: Parameters<PlaywrightPage["getByRole"]>) {
  const from = this.activeFrame ? this.activeFrame.getByRole(...args) : this.__proto.getByRole(...args);
  return new LocatorClass(this["getLocatorFrom"](from)) as Locator;
}

export type GetByRoleCommand = typeof getByRole;
