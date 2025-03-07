import { LocatorCondition } from "@conditions/locator/locator-condition";
import { Axis } from "@core/gherkin/enums";

import type { ExpectedConditionKwargs } from "@conditions/types";

export class AxisLocationEquals extends LocatorCondition {
  constructor(axis: Axis, expected: number, kwargs: ExpectedConditionKwargs) {
    super(kwargs);
    this.expected = this.toString(expected);
    this.kwargs.axis = axis;
  }

  private toString(location: number) {
    return `${location}`;
  }

  async evaluate() {
    try {
      const location = await this.locator.location();
      this.actual = this.toString(location[this.kwargs.axis]);
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
