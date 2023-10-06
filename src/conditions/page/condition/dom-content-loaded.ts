import { PageCondition } from "@conditions/page/page-condition";

export class DomContentLoaded extends PageCondition {
  public constructor(preferred?: boolean) {
    super(preferred);
    this.expected = this.constructor.name.toLowerCase();
  }

  async evaluate() {
    try {
      await this.page.waitForLoadState(this.expected);
      this.actual = this.expected;
      this.passed = true;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
