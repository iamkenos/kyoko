
import { Fixture } from "@commands/fixture";

import type { Page as PlaywrightPageType } from "@playwright/test";

export class Page extends Fixture<PlaywrightPageType> {
  constructor(page: PlaywrightPageType) {
    super(page);
  }
}
