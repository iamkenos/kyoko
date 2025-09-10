import { ExpectedCondition } from "../expected-condition";

import type { Page } from "playwright";
import type { ExpectedConditionKwargs } from "@conditions/types";

export abstract class PageCondition extends ExpectedCondition {
  protected page: Page;

  constructor(kwargs: ExpectedConditionKwargs) {
    super(kwargs);
  }
}
