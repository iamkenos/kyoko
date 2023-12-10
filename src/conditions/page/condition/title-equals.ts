import { PageCondition } from "@conditions/page/page-condition";

export class TitleEquals extends PageCondition {
  constructor(expected?: string, preferred?: boolean) {
    super(preferred);
    this.expected = expected || "";
  }

  async evaluate() {
    try {
      this.actual = await this.page.title();
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
