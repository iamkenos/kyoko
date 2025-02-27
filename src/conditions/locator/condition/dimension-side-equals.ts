import { LocatorCondition } from "@conditions/locator/locator-condition";
import { SizeContext } from "@core/gherkin/enums";

import type { ExpectedConditionKwargs } from "@conditions/types";

export class DimensionSideEquals extends LocatorCondition {
  constructor(side: SizeContext, expected: number, kwargs: ExpectedConditionKwargs) {
    super(kwargs);
    this.expected = this.toString(expected);
    this.kwargs.side = side;
  }

  private toString(size: number) {
    return `${size}px`;
  }

  async evaluate() {
    try {
      const box = await this.locator.boundingBox();
      const size = Math.round(box[this.kwargs.side] * 100) / 100;
      this.actual = this.toString(size);
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
