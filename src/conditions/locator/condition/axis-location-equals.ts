import { LocatorCondition } from "@conditions/locator/locator-condition";
import { Axis } from "@gherkin";

export class AxisLocationEquals extends LocatorCondition {
  public constructor(axis: Axis, expected: number, preferred?: boolean) {
    super(preferred);
    this.on = axis;
    this.expected = this.toString(expected);
  }

  private toString(location: number) {
    return `${location}`;
  }

  async evaluate() {
    try {
      const location = await this.locator.location();
      this.actual = this.toString(location[this.on]);
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
