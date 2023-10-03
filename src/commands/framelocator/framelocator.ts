import { Fixture } from "@commands/fixture";

import type { FrameLocator as PlaywrightFrameLocatorType } from "@playwright/test";

export class FrameLocator extends Fixture<PlaywrightFrameLocatorType> {
  constructor(locator: PlaywrightFrameLocatorType) {
    super(locator);
  }
}
