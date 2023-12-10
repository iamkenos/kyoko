import { LocatorCondition } from "@conditions/locator/locator-condition";

export class ValueContains extends LocatorCondition {
  constructor(expected: string, preferred?: boolean) {
    super(preferred);
    this.expected = expected;
  }

  async evaluate() {
    try {
      this.actual = await this.locator.inputValue();
      this.passed = this.actual.includes(this.expected);
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
