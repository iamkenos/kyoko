import { LocatorCondition } from "@conditions/locator/locator-condition";

export class Selected extends LocatorCondition {
  public constructor(preferred?: boolean) {
    super(preferred);
    this.expected = true;
  }

  async evaluate() {
    try {
      this.actual = await this.locator.isSelected();
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
