import { LocatorCondition } from "@conditions/locator/locator-condition";

export class Focused extends LocatorCondition {
  constructor(preferred?: boolean) {
    super(preferred);
    this.expected = true;
  }

  async evaluate() {
    try {
      this.actual = await this.locator.isFocused();
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
