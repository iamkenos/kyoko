import { PageCondition } from "@conditions/page/page-condition";

export class WindowCountEquals extends PageCondition {
  constructor(expected: number, preferred?: boolean) {
    super(preferred);
    this.expected = expected;
  }

  async evaluate() {
    try {
      this.actual = this.page.context().pages().length;
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
