import { PageCondition } from "@conditions/page/page-condition";

import type { ExpectedConditionKwargs } from "@conditions/types";

export class DomContentLoaded extends PageCondition {
  constructor(kwargs: ExpectedConditionKwargs) {
    super(kwargs);
    this.expected = this.constructor.name.toLowerCase();
  }

  async evaluate() {
    try {
      await this.page.waitForLoadState(this.expected);
      this.actual = this.expected;
      this.passed = true;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
