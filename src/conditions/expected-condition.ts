import type { Locator, Page } from "../generics/base.world";
import type { ExpectedConditionResult } from "./types";

export abstract class ExpectedCondition {
  protected name: string;

  protected not: boolean;

  protected timeout: number;

  protected expected: any;

  protected actual: any;

  protected passed: any;

  protected result: ExpectedConditionResult;

  protected on?: string;

  protected page?: Page;

  protected locator?: Locator;

  protected constructor(preferred = true) {
    this.name = this.constructor.name;
    this.not = !preferred;
  }

  setPage(page: Page) {
    this.page = page;
    return this;
  }

  setLocator(locator: Locator) {
    this.locator = locator;
    return this;
  }

  async evaluate() {
    const name = this.name;
    const actual = this.actual;
    const expected = this.expected;
    const passed = this.not ? !this.passed : this.passed;

    return {
      name,
      actual,
      expected,
      passed,
      message: `
  Condition: ${name} ${this.on ? `[${this.on}] ` : ""}${this.locator ? `\n  Locator: ${this.locator}` : ""}
  Result: ${passed ? "Success" : "Failed"}
  Expected${this.not ? " (Not)" : ""}: ${expected instanceof Array ? `\n${expected.map((i: string) => `    ${i}`).join("\n")}` : expected}
  Actual: ${actual instanceof Array ? `\n${actual.map((i: string) => `    ${i}`).join("\n")}` : actual}`
    };
  }
}
