import { Fixture } from "@commands/fixture";

import type { Locator as PlaywrightLocatorType } from "@playwright/test";

export class Locator extends Fixture<PlaywrightLocatorType> {
  readonly selector: string;

  constructor(locator: PlaywrightLocatorType) {
    super(locator);
    this.selector = locator["_selector"];
  }
}
