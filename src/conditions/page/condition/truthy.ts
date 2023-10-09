import { PageCondition } from "@conditions/page/page-condition";

export class Truthy extends PageCondition {
  public constructor(expected: boolean | (() => Promise<boolean>), preferred?: boolean) {
    super(preferred);
    this.expected = expected;
  }

  async evaluate() {
    try {
      this.actual = typeof this.expected === "function" ? await this.expected() : this.expected;
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
