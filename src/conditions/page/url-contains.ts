import { string } from "@common/utils";
import { ExpectedCondition } from "@conditions/expected-condition";

export class UrlContains extends ExpectedCondition {
  public constructor(expected: string, preferred?: boolean) {
    super(preferred);
    this.expected = expected || "";
  }

  async evaluate() {
    this.actual = this.page.url();
    this.expected = string.isURL(this.expected) ? this.expected : new URL(this.expected, this.page.context().config.baseURL).href;
    this.passed = this.actual.includes(this.expected);

    return super.evaluate();
  }
}
