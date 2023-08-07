import { ExpectedCondition } from "@conditions/expected-condition";

export class UrlContains extends ExpectedCondition {
  public constructor(expected: string, preferred?: boolean) {
    super(preferred);
    this.expected = expected || "";
  }

  async evaluate() {
    this.actual = this.page.url();
    this.passed = this.actual.includes(this.expected);

    return super.evaluate();
  }
}
