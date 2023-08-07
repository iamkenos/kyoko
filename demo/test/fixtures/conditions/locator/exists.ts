import { ExpectedCondition } from "@conditions/expected-condition";

export class Exists extends ExpectedCondition {
  public constructor(preferred?: boolean) {
    super(preferred);
    this.expected = true;
  }

  async evaluate() {
    this.actual = await this.locator.count() > 0;
    this.passed = this.actual === this.expected;

    return super.evaluate();
  }
}
