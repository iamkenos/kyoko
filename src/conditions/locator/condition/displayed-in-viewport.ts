import { expect } from "@playwright/test";
import { LocatorCondition } from "@conditions/locator/locator-condition";

export class DisplayedInViewport extends LocatorCondition {
  constructor(preferred?: boolean) {
    super(preferred);
    this.expected = true;
  }

  async evaluate() {
    try {
      await expect(this.locator).toBeInViewport();
      this.actual = true;
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
