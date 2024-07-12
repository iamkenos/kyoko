import { Fixture } from "@fixtures/fixture";

import type { BrowserContext as PlaywrightBrowserContext } from "@playwright/test";

export class BrowserContext extends Fixture<PlaywrightBrowserContext> {
  constructor(locator: PlaywrightBrowserContext) {
    super(locator);
  }
}
