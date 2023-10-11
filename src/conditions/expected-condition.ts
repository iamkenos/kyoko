export abstract class ExpectedCondition {
  protected name: string;

  protected not: boolean;

  protected expected: any;

  protected actual: any;

  protected on?: string;

  passed: boolean;

  message: string;

  protected constructor(preferred = true) {
    this.name = this.constructor.name;
    this.not = !preferred;
    this.passed = false;
  }

  async onFailure() {}

  async evaluate() {
    this.passed = this.not ? !this.passed : this.passed;
    this.message = `
  Condition: ${this.name} ${this.on ? `[${this.on}] ` : ""}
  Result: ${this.passed ? "Success" : "Failed"}
  Expected${this.not ? " (Not)" : ""}: ${this.expected instanceof Array ? `\n${this.expected.map((i: string) => `    ${i}`).join("\n")}` : this.expected}
  Actual: ${this.actual instanceof Array ? `\n${this.actual.map((i: string) => `    ${i}`).join("\n")}` : this.actual}`;
    return this;
  }
}
