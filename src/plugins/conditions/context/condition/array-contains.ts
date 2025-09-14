import { ExpectedCondition } from "@plugins/conditions/expected-condition";

import type { ExpectedConditionKwargs } from "@plugins/conditions/types";

export class ArrayContains<T> extends ExpectedCondition {
  constructor(actual: Array<T>, expected: Array<T>, kwargs: ExpectedConditionKwargs) {
    super(kwargs);
    this.actual = actual;
    this.expected = expected;
  }

  async evaluate() {
    try {
      this.passed = this.expected.every((item: T) => this.actual.includes(item));
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
