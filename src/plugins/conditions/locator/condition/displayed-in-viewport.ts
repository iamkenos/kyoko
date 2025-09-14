import { expect } from "@playwright/test";
import { LocatorCondition } from "@plugins/conditions/locator/locator-condition";

import type { ExpectedConditionKwargs } from "@plugins/conditions/types";

export class DisplayedInViewport extends LocatorCondition {
  constructor(kwargs: ExpectedConditionKwargs) {
    super(kwargs);
    this.expected = true;
  }

  async evaluate() {
    try {
      await expect(this.locator).toBeInViewport();
      this.actual = true;
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
