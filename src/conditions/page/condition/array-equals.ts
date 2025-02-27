import { PageCondition } from "@conditions/page/page-condition";

import type { ExpectedConditionKwargs } from "@conditions/types";

export class ArrayEquals<T> extends PageCondition {
  constructor(actual: Array<T>, expected: Array<T>, kwargs: ExpectedConditionKwargs) {
    super(kwargs);
    this.actual = actual;
    this.expected = expected;
  }

  async evaluate() {
    try {
      this.passed = JSON.stringify(this.actual) === JSON.stringify(this.expected);
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
