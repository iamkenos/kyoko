import { PageCondition } from "@plugins/conditions/page/page-condition";

import type { ExpectedConditionKwargs } from "@plugins/conditions/types";

export class WindowCountEquals extends PageCondition {
  constructor(expected: number = 0, kwargs: ExpectedConditionKwargs) {
    super(kwargs);
    this.expected = expected;
  }

  async evaluate() {
    try {
      this.actual = this.page.context().pages().length;
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
