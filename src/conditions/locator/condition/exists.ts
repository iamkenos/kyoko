import { LocatorCondition } from "@conditions/locator/locator-condition";

import type { ExpectedConditionKwargs } from "@conditions/types";

export class Exists extends LocatorCondition {
  constructor(kwargs: ExpectedConditionKwargs) {
    super(kwargs);
    this.expected = true;
  }

  async evaluate() {
    try {
      this.actual = await this.locator.count() > 0;
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
