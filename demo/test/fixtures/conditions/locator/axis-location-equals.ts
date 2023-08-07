import { ExpectedCondition } from "@conditions/expected-condition";
import { Axis } from "@gherkin";

export class AxisLocationEquals extends ExpectedCondition {
  public constructor(axis: Axis, expected: number, preferred?: boolean) {
    super(preferred);
    this.on = axis;
    this.expected = this.toString(expected);
  }

  private toString(location: number) {
    return `${location}`;
  }

  async evaluate() {
    const location = await this.locator.location();
    this.actual = this.toString(location[this.on]);
    this.passed = this.actual === this.expected;

    return super.evaluate();
  }
}
