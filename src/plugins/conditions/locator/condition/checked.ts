import { LocatorCondition } from "@plugins/conditions/locator/locator-condition";

import type { ExpectedConditionKwargs } from "@plugins/conditions/types";

export class Checked extends LocatorCondition {
  constructor(kwargs: ExpectedConditionKwargs) {
    super(kwargs);
    this.expected = true;
  }

  async evaluate() {
    try {
      this.actual = await this.locator.isChecked();
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
