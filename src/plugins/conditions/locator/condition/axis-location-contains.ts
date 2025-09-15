import { LocatorCondition } from "@plugins/conditions/locator/locator-condition";
import { Axis } from "@plugins/gherkin/enums";

import type { ExpectedConditionKwargs } from "@plugins/conditions/types";

export class AxisLocationContains extends LocatorCondition {
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
      this.passed = this.actual.includes(this.expected);
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
