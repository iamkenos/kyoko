import * as fs from "fs-extra";

import { ExpectedCondition } from "@plugins/conditions/expected-condition";

import type { ExpectedConditionKwargs } from "@plugins/conditions/types";

export class FileExists extends ExpectedCondition {
  constructor(path: string, kwargs: ExpectedConditionKwargs) {
    super(kwargs);
    this.expected = true;
    this.kwargs.path = path;
  }

  async evaluate() {
    try {
      this.actual = fs.existsSync(this.kwargs.path);
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
