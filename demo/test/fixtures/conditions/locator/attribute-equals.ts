import { ExpectedCondition } from "@conditions/expected-condition";

export class AttributeEquals extends ExpectedCondition {
  public constructor(attribute: string, expected: string, preferred?: boolean) {
    super(preferred);
    this.expected = expected;
    this.on = attribute;
  }

  async evaluate() {
    this.actual = await this.locator.getAttribute(this.on);
    this.passed = this.actual === this.expected;

    return super.evaluate();
  }
}
