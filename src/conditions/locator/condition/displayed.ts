import { LocatorCondition } from "@conditions/locator/locator-condition";

export class Displayed extends LocatorCondition {
  constructor(preferred?: boolean) {
    super(preferred);
    this.expected = true;
  }

  async evaluate() {
    try {
      this.actual = await this.locator.isVisible();
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
