import { LocatorCondition } from "@conditions/locator/locator-condition";

export class CountEquals extends LocatorCondition {
  constructor(expected: number, preferred?: boolean) {
    super(preferred);
    this.expected = expected;
  }

  async evaluate() {
    try {
      this.actual = await this.locator.count();
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
