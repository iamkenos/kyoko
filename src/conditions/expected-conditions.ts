import { expect } from "@playwright/test";

import type { ExpectedCondition } from "./expected-condition";
import type { ExpectedConditionOptions, ExpectedConditionResult, ExpectedConditionsResult } from "./types";

export class ExpectedConditions {
  protected name: string;

  private conditions: ExpectedCondition[];

  private result: ExpectedConditionsResult;

  private timeout: number;

  private action: Function;

  private soft: boolean;

  constructor(options?: ExpectedConditionOptions) {
    this.name = this.constructor.name;
    this.conditions = [];
    this.timeout = options?.timeout;
    this.soft = options?.soft;
  }

  private async evaluateAll() {
    const evaluations: ExpectedConditionResult[] = [];
    for (let i = 0; i < this.conditions.length; i++) {
      const evaluation = await this.conditions[i].evaluate();
      evaluations.push(evaluation);
    }

    const failed = evaluations.filter((result) => !result.passed).length;
    const total = evaluations.length;

    this.result = {
      passed: failed === 0,
      results: evaluations,
      message: `${failed}/${total} expected conditions not met after waiting for ${this.timeout}ms:
  Expression: ${this.name}
  ${evaluations.map((result) => result.message).join("\n  ------------------------------")}`
    };
  }

  protected addCondition(condition: ExpectedCondition) {
    const [locator, page] = ["locator", "page"];
    condition[locator] = this[locator];
    condition[page] = this[page];
    this.conditions.push(condition);
    return this;
  }

  setAction(action: Function) {
    this.action = action;
    return this;
  }

  setName(name: string) {
    this.name = name;
    return this;
  }

  async poll() {
    try {
      await expect.poll(async() => {
        this.action !== undefined && await this.action();
        await this.evaluateAll();
        return this.result.passed;
      }, { intervals: [250], timeout: this.timeout + 250 }).toBe(true);
    } catch (e) {
      if (!this.soft) {
        throw new Error(this.result?.message || e);
      } else {
        return this.result.passed;
      }
    }
  }
}
