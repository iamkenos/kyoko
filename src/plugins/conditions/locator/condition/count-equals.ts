import { LocatorCondition } from "@plugins/conditions/locator/locator-condition";

import type { ExpectedConditionKwargs } from "@plugins/conditions/types";

export class CountEquals extends LocatorCondition {
  constructor(expected: number, kwargs: ExpectedConditionKwargs) {
    super(kwargs);
    this.expected = expected;
  }

  async evaluate() {
    try {
      this.actual = await this.locator.count();
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
