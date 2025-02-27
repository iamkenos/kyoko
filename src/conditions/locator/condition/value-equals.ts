import { LocatorCondition } from "@conditions/locator/locator-condition";

import type { ExpectedConditionKwargs } from "@conditions/types";

export class ValueEquals extends LocatorCondition {
  constructor(expected: string = "", kwargs: ExpectedConditionKwargs) {
    super(kwargs);
    this.expected = expected;
  }

  async evaluate() {
    try {
      this.actual = await this.locator.inputValue();
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
