import { LocatorCondition } from "@conditions/locator/locator-condition";

export class CssPropertyExists extends LocatorCondition {
  public constructor(property: string, preferred?: boolean) {
    super(preferred);
    this.expected = true;
    this.on = property;
  }

  async evaluate() {
    try {
      const style: Object = await this.locator.evaluate((node: HTMLElement) => getComputedStyle(node));
      this.actual = !!Object.values(style).find(i => i === this.on);
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
