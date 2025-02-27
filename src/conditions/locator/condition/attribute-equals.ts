import { LocatorCondition } from "@conditions/locator/locator-condition";

import type { ExpectedConditionKwargs } from "@conditions/types";

export class AttributeEquals extends LocatorCondition {
  constructor(attribute: string, expected: string = "", kwargs: ExpectedConditionKwargs) {
    super(kwargs);
    this.expected = expected;
    this.kwargs.attribute = attribute;
  }

  async evaluate() {
    try {
      this.actual = await this.locator.getAttribute(this.kwargs.attribute);
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
