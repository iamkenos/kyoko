import { changecase } from "@common/utils/string";
import { PageCondition } from "@conditions/page/page-condition";

import type { ExpectedConditionKwargs } from "@conditions/types";

export class Truthy extends PageCondition {
  private truthy: boolean | (() => Promise<boolean>) | (() => boolean);

  constructor(truthy: boolean | (() => Promise<boolean>) | (() => boolean), kwargs: ExpectedConditionKwargs) {
    super(kwargs);
    this.expected = true;
    this.truthy = truthy;
    this.name = changecase.capitalCase((this.truthy as any)["name"] || this.name);
  }

  async evaluate() {
    try {
      this.actual = typeof this.truthy === "function" ? await this.truthy() : this.truthy;
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
