import { expect } from "@playwright/test";

import type { ExpectedCondition } from "./expected-condition";
import type { ExpectedConditionOptions, ExpectedConditionsResult } from "./types";

export class ExpectedConditions {
  protected name: string;

  private conditions: ExpectedCondition[];

  private result: ExpectedConditionsResult;

  private timeout: number;

  private interval: number;

  private action: Function;

  private soft: boolean;

  constructor(options?: ExpectedConditionOptions) {
    this.name = this.constructor.name;
    this.conditions = [];
    this.timeout = options?.timeout;
    this.interval = options?.interval || 250;
    this.soft = options?.soft;
  }

  private async evaluateAll() {
    const evaluations: ExpectedCondition[] = [];
    for (let i = 0; i < this.conditions.length; i++) {
      const evaluation = await this.conditions[i].evaluate();
      evaluations.push(evaluation);
    }

    const failed = evaluations.filter((result) => !result.passed).length;
    const total = evaluations.length;

    this.result = {
      evaluations,
      passed: failed === 0,
      message: `${failed}/${total} expected conditions not met after waiting for ${this.timeout}ms:
  Expression: ${this.name}
  ${evaluations.map((result) => result.message).join("\n  ------------------------------")}`
    };
  }

  addCondition(condition: ExpectedCondition) {
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
      }, { intervals: [this.interval], timeout: this.timeout + 250 }).toBe(true);
    } catch (e) {
      if (!this.soft) {
        if (this.result) {
          const failures = this.result.evaluations.filter(e => !e.passed);
          for (let i = 0; i < failures.length; i++) { await failures[i].onFailure(); }
          throw new Error(this.result.message);
        } else {
          throw new Error(`Unhandled exception: ${e}`);
        }
      } else {
        return this.result.passed;
      }
    }
  }
}
