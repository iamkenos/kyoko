import { LocatorCondition } from "@conditions/locator/locator-condition";
import { SizeContext } from "@core/gherkin/enums";

export class DimensionSideEquals extends LocatorCondition {
  public constructor(side: SizeContext, expected: number, preferred?: boolean) {
    super(preferred);
    this.on = side;
    this.expected = this.toString(expected);
  }

  private toString(size: number) {
    return `${size}px`;
  }

  async evaluate() {
    try {
      const box = await this.locator.boundingBox();
      const size = Math.round(box[this.on] * 100) / 100;
      this.actual = this.toString(size);
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
