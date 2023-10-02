import { ExpectedCondition } from "@conditions/expected-condition";

export class TitleContains extends ExpectedCondition {
  public constructor(expected: string, preferred?: boolean) {
    super(preferred);
    this.expected = expected || "";
  }

  async evaluate() {
    this.actual = await this.page.title();
    this.passed = this.actual.includes(this.expected);

    return super.evaluate();
  }
}
