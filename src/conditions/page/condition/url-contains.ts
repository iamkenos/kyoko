import { PageCondition } from "@conditions/page/page-condition";

import type { ExpectedConditionKwargs } from "@conditions/types";

export class UrlContains extends PageCondition {
  constructor(expected: string, kwargs: ExpectedConditionKwargs) {
    super(kwargs);
    this.expected = expected;
  }

  async evaluate() {
    try {
      this.actual = this.page.url();
      this.expected = this.page.urlFromBase(this.expected);
      this.passed = this.actual.includes(this.expected);
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
