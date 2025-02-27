import { changecase } from "@common/utils/string";

import type { ExpectedConditionKwargs } from "./types";

export abstract class ExpectedCondition {
  protected kwargs: ExpectedConditionKwargs;

  protected index: number;

  protected name: string;

  protected not: boolean;

  protected expected: any;

  protected actual: any;

  protected on?: string;

  passed: boolean;

  message: string;

  protected constructor(kwargs: ExpectedConditionKwargs) {
    this.name = changecase.capitalCase(this.constructor.name);
    this.kwargs = kwargs || { not: false };
    this.not = this.kwargs.not;
    this.passed = false;
  }

  private beautifyArgValue(value: any) {
    const result = value instanceof Array || value instanceof Object
      ? `\n  ${JSON.stringify(value, null, 2).split("\n").map(line => `    ${line}`).join("\n")}`
      : value;
    return result;
  }

  private beautifyKwargs() {
    const result = Object.entries(this.kwargs)
      .filter(([key]) => key !== "not")
      .map(([key, value]) => `  ${changecase.capitalCase(key)}: ${this.beautifyArgValue(value)}`)
      .join("\n");
    return result ? "\n" + result : "";
  }

  async onFailure() {}

  async evaluate() {
    this.passed = this.not ? !this.passed : this.passed;
    this.message = `
  Condition #${this.index + 1}: ${this.name}
  Result: ${this.passed ? "Success" : "Failed"}${this.beautifyKwargs()}
  Expected${this.not ? " (Not)" : ""}: ${this.beautifyArgValue(this.expected)}
  Actual: ${this.beautifyArgValue(this.actual)}`;
    return this;
  }
}
