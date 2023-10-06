import { ExpectedCondition } from "../expected-condition";

import type { Locator } from "@commands/locator/types";

export abstract class LocatorCondition extends ExpectedCondition {
  protected readonly locator: Locator;

  constructor(preferred: boolean) {
    super(preferred);
  }
}
