import { PageCondition } from "@plugins/conditions/page/page-condition";

import type { ExpectedConditionKwargs } from "@plugins/conditions/types";

export class TitleEquals extends PageCondition {
  constructor(expected: string = "", kwargs: ExpectedConditionKwargs) {
    super(kwargs);
    this.expected = expected;
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
