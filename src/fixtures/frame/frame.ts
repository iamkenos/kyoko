import { Fixture } from "@fixtures/fixture";

import type { FrameLocator as PlaywrightFrameLocator } from "@playwright/test";

export class FrameLocator extends Fixture<PlaywrightFrameLocator> {
  constructor(locator: PlaywrightFrameLocator) {
    super(locator);
  }
}
