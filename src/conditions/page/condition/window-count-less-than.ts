import { PageCondition } from "@conditions/page/page-condition";

import type { ExpectedConditionKwargs } from "@conditions/types";

export class WindowCountLessThan extends PageCondition {
  constructor(expected: number, kwargs: ExpectedConditionKwargs) {
    super(kwargs);
    this.expected = expected;
  }

  async evaluate() {
    try {
      this.actual = this.page.context().pages().length;
      this.passed = this.actual < this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
