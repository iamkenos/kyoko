import { LocatorCondition } from "@conditions/locator/locator-condition";

export class TextEquals extends LocatorCondition {
  public constructor(expected?: string, preferred?: boolean) {
    super(preferred);
    this.expected = expected || "";
  }

  async evaluate() {
    try {
      this.actual = await this.locator.innerText();
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
