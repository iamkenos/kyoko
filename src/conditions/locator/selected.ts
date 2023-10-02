import { ExpectedCondition } from "@conditions/expected-condition";

export class Selected extends ExpectedCondition {
  public constructor(preferred?: boolean) {
    super(preferred);
    this.expected = true;
  }

  async evaluate() {
    this.actual = await this.locator.isSelected();
    this.passed = this.actual === this.expected;

    return super.evaluate();
  }
}
