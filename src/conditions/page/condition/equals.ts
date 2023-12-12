import { PageCondition } from "@conditions/page/page-condition";

export class Equals<T = any> extends PageCondition {
  constructor(actual: T, expected: T, preferred?: boolean) {
    super(preferred);
    this.actual = actual;
    this.expected = expected;
  }

  async evaluate() {
    try {
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
