import { Fixture } from "@fixtures/fixture";

import type { Page as PlaywrightPage } from "@playwright/test";

export class Page extends Fixture<PlaywrightPage> {
  constructor(page: PlaywrightPage) {
    super(page);
  }
}
