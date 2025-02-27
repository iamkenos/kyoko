import { ExpectedCondition } from "../expected-condition";

import type { ExpectedConditionKwargs } from "@conditions/types";
import type { Page } from "@fixtures/page/types";

export abstract class PageCondition extends ExpectedCondition {
  protected page: Page;

  constructor(kwargs: ExpectedConditionKwargs) {
    super(kwargs);
  }
}
