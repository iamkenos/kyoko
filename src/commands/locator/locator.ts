import { Fixture } from "@commands/fixture";

import type { Locator as PlaywrightLocatorType } from "@playwright/test";

export class Locator extends Fixture<PlaywrightLocatorType> {

  constructor(locator: PlaywrightLocatorType) {
    super(locator);
  }
}
