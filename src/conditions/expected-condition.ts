import type { ExpectedConditionResult } from "./types";

export abstract class ExpectedCondition {
  protected name: string;

  protected not: boolean;

  protected expected: any;

  protected actual: any;

  protected passed: boolean;

  protected on?: string;

  protected constructor(preferred = true) {
    this.name = this.constructor.name;
    this.not = !preferred;
    this.passed = false;
  }

  async evaluate() {
    const name = this.name;
    const on = this.on;
    const actual = this.actual;
    const expected = this.expected;
    const not = this.not;
    const passed = this.not ? !this.passed : this.passed;
    const message = `
  Condition: ${name} ${on ? `[${on}] ` : ""}
  Result: ${passed ? "Success" : "Failed"}
  Expected${not ? " (Not)" : ""}: ${expected instanceof Array ? `\n${expected.map((i: string) => `    ${i}`).join("\n")}` : expected}
  Actual: ${actual instanceof Array ? `\n${actual.map((i: string) => `    ${i}`).join("\n")}` : actual}`;

    const result: ExpectedConditionResult = { name, actual, expected, passed, message };
    return result;
  }
}
