import { ExpectedCondition } from "@conditions/expected-condition";
import { SizeContext } from "@gherkin";

export class DimensionSideEquals extends ExpectedCondition {
  public constructor(side: SizeContext, expected: number, preferred?: boolean) {
    super(preferred);
    this.on = side;
    this.expected = this.toString(expected);
  }

  private toString(size: number) {
    return `${size}px`;
  }

  async evaluate() {
    const box = await this.locator.boundingBox();
    const size = Math.round(box[this.on] * 100) / 100;
    this.actual = this.toString(size);
    this.passed = this.actual === this.expected;

    return super.evaluate();
  }
}
