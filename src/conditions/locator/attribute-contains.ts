import { ExpectedCondition } from "@conditions/expected-condition";

export class AttributeContains extends ExpectedCondition {
  public constructor(attribute: string, expected: string, preferred?: boolean) {
    super(preferred);
    this.expected = expected;
    this.on = attribute;
  }

  async evaluate() {
    this.actual = await this.locator.getAttribute(this.on);
    this.passed = this.actual.includes(this.expected);

    return super.evaluate();
  }
}
