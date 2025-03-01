import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { FrameLocator as PlaywrightFrameLocator } from "@playwright/test";
import type { FrameLocator } from "@fixtures/frame/types";
import type { Locator } from "@fixtures/locator/types";

export function getByRole(this: FrameLocator, ...args: Parameters<PlaywrightFrameLocator["getByRole"]>) {
  return new LocatorClass(this.__proto.getByRole(...args)) as Locator;
}

export type GetByRoleCommand = typeof getByRole;
