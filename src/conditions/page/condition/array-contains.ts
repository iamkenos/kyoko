import { PageCondition } from "@conditions/page/page-condition";

export class ArrayContains<T> extends PageCondition {
  public constructor(actual: Array<T>, expected: Array<T>, preferred?: boolean) {
    super(preferred);
    this.actual = actual;
    this.expected = expected;
  }

  async evaluate() {
    try {
      this.passed = this.expected.every((item: T) => this.actual.includes(item));
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
