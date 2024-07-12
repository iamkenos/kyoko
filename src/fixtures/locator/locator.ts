import { Fixture } from "@fixtures/fixture";

import type { PlaywrightLocator } from "./types";

export class Locator extends Fixture<Partial<PlaywrightLocator>> {

  constructor(locator: Partial<PlaywrightLocator>) {
    super(locator);
  }
}
