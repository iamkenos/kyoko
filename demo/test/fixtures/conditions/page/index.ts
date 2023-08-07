import type { ExpectedConditionOptions } from "../types";

import { Page } from "@generics";
import { ExpectedConditions } from "../expected-conditions";
import { DomContentLoaded } from "./dom-content-loaded";

export class PageConditions extends ExpectedConditions {
  private readonly page: Page;

  constructor(page: Page, options?: ExpectedConditionOptions) {
    super(options);
    this.page = page;
  }

  domContentLoaded(preferred?: boolean) {
    return this.addCondition(new DomContentLoaded(preferred).setPage(this.page));
  }
}
