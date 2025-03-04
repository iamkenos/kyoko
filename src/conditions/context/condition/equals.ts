import { ExpectedCondition } from "@conditions/expected-condition";

import type { ExpectedConditionKwargs } from "@conditions/types";

export class Equals<T = any> extends ExpectedCondition {
  constructor(actual: T, expected: T, kwargs: ExpectedConditionKwargs) {
    super(kwargs);
    this.actual = actual;
    this.expected = expected;
  }

  async evaluate() {
    try {
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
