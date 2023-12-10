import { LocatorCondition } from "@conditions/locator/locator-condition";

export class AttributeExists extends LocatorCondition {
  constructor(attribute: string, preferred?: boolean) {
    super(preferred);
    this.expected = true;
    this.on = attribute;
  }

  async evaluate() {
    try {
      this.actual = !!(await this.locator.getAttribute(this.on));
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
