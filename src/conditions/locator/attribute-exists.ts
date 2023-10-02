import { ExpectedCondition } from "@conditions/expected-condition";

export class AttributeExists extends ExpectedCondition {
  public constructor(attribute: string, preferred?: boolean) {
    super(preferred);
    this.expected = true;
    this.on = attribute;
  }

  async evaluate() {
    this.actual = !!(await this.locator.getAttribute(this.on));
    this.passed = this.actual === this.expected;

    return super.evaluate();
  }
}
