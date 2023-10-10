import { PageCondition } from "@conditions/page/page-condition";

export class ArrayEquals<T> extends PageCondition {
  public constructor(actual: Array<T>, expected: Array<T>, preferred?: boolean) {
    super(preferred);
    this.actual = actual;
    this.expected = expected;
  }

  async evaluate() {
    try {
      this.passed = JSON.stringify(this.actual) === JSON.stringify(this.expected);
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
