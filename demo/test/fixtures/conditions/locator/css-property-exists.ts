import { ExpectedCondition } from "@conditions/expected-condition";

export class CssPropertyExists extends ExpectedCondition {
  public constructor(property: string, preferred?: boolean) {
    super(preferred);
    this.expected = true;
    this.on = property;
  }

  async evaluate() {
    const style: Object = await this.locator.evaluate((node: HTMLElement) => getComputedStyle(node));
    this.actual = !!Object.values(style).find(i => i === this.on);
    this.passed = this.actual === this.expected;

    return super.evaluate();
  }
}
