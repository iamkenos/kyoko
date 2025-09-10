import { ExpectedCondition } from "../expected-condition";

import type { Locator } from "playwright";
import type { ExpectedConditionKwargs } from "../types";

export abstract class LocatorCondition extends ExpectedCondition {
  protected readonly locator: Locator;

  constructor(kwargs: ExpectedConditionKwargs) {
    super(kwargs);
  }
}
