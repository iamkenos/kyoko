import { LocatorCondition } from "@conditions/locator/locator-condition";

export class Enabled extends LocatorCondition {
  constructor(preferred?: boolean) {
    super(preferred);
    this.expected = true;
  }

  async evaluate() {
    try {
      this.actual = await this.locator.isEnabled();
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
