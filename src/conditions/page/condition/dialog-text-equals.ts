import { PageCondition } from "@conditions/page/page-condition";

export class DialogTextEquals extends PageCondition {
  public constructor(expected?: string, preferred?: boolean) {
    super(preferred);
    this.expected = expected || "";
  }

  async evaluate() {
    try {
      this.actual = this.page.dialog.message;
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
