import { Fixture } from "@commands/fixture";

import type { BrowserContext as PlaywrightBrowserContextType } from "@playwright/test";

export class BrowserContext extends Fixture<PlaywrightBrowserContextType> {
  constructor(locator: PlaywrightBrowserContextType) {
    super(locator);
  }
}
