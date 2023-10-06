import * as string from "@common/utils/string";

import { PageCondition } from "@conditions/page/page-condition";

export class UrlContains extends PageCondition {
  public constructor(expected: string, preferred?: boolean) {
    super(preferred);
    this.expected = expected || "";
  }

  async evaluate() {
    try {
      this.actual = this.page.url();
      this.expected = string.isURL(this.expected) ? this.expected : new URL(this.expected, this.page.context().config.baseURL).href;
      this.passed = this.actual.includes(this.expected);
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
