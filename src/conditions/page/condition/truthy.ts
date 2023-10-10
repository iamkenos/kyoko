import { changecase } from "@common/utils/string";
import { PageCondition } from "@conditions/page/page-condition";

export class Truthy extends PageCondition {
  private truthy: boolean | (() => Promise<boolean>) | (() => boolean);

  public constructor(truthy: boolean | (() => Promise<boolean>) | (() => boolean), preferred?: boolean) {
    super(preferred);
    this.expected = true;
    this.truthy = truthy;
    this.name = changecase.pascalCase(this.truthy["name"]) || this.name;
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
