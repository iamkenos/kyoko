import { ExpectedCondition } from "../expected-condition";

import type { Page } from "@fixtures/page/types";

export abstract class PageCondition extends ExpectedCondition {
  protected page: Page;

  constructor(preferred: boolean) {
    super(preferred);
  }
}
