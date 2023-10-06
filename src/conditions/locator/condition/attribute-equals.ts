import { LocatorCondition } from "@conditions/locator/locator-condition";

export class AttributeEquals extends LocatorCondition {
  public constructor(attribute: string, expected?: string, preferred?: boolean) {
    super(preferred);
    this.expected = expected || "";
    this.on = attribute;
  }

  async evaluate() {
    try {
      this.actual = await this.locator.getAttribute(this.on);
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
