import * as fs from "fs-extra";

import { PageCondition } from "@conditions/page/page-condition";

export class FileExists extends PageCondition {
  constructor(path: string, preferred?: boolean) {
    super(preferred);
    this.expected = true;
    this.on = path;
  }

  async evaluate() {
    try {
      this.actual = fs.existsSync(this.on);
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
