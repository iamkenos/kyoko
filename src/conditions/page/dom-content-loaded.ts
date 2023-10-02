import { ExpectedCondition } from "@conditions/expected-condition";

export class DomContentLoaded extends ExpectedCondition {
  public constructor(preferred?: boolean) {
    super(preferred);
    this.expected = this.constructor.name.toLowerCase();
  }

  async evaluate() {
    await this.page.waitForLoadState(this.expected);
    this.actual = this.expected;
    this.passed = true;

    return super.evaluate();
  }
}
