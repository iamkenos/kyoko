import { ExpectedCondition } from "@conditions/expected-condition";

export class WindowCountMoreThan extends ExpectedCondition {
  public constructor(expected: number, preferred?: boolean) {
    super(preferred);
    this.expected = expected || "";
  }

  async evaluate() {
    this.actual = this.page.context().pages().length;
    this.passed = this.actual > this.expected;

    return super.evaluate();
  }
}
