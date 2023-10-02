import type { ExpectedCondition } from "./expected-condition";
import type { ExpectedConditionOptions, ExpectedConditionResult, ExpectedConditionsResult } from "./types";

import { expect } from "@playwright/test";

export class ExpectedConditions {
  private name: string;

  private conditions: ExpectedCondition[];

  private evaluations: Map<string, ExpectedConditionResult>;

  private result: ExpectedConditionsResult;

  private timeout: number;

  private action: Function;

  private soft: boolean;

  constructor(options?: ExpectedConditionOptions) {
    this.name = options?.name || this.constructor.name;
    this.conditions = [];
    this.evaluations = new Map();
    this.timeout = this.setTimeout(options);
    this.soft = options?.soft;
  }

  private setTimeout(options: ExpectedConditionOptions) {
    // expect timeout cannot be less than playwright's page timeout, otherwise
    // the expect promise will resolve first before page and locator commands does
    const buffer = 5000;
    const envTimeout = +process.env.TIMEOUT;
    const timeout = options?.timeout || envTimeout;
    return timeout <= envTimeout ? timeout + buffer : timeout;
  }

  private async evaluateAll() {
    for (let i = 0; i < this.conditions.length; i++) {
      const evaluation = await this.conditions[i].evaluate();
      this.evaluations.set(evaluation.name, evaluation);
    }

    const evaluations = Array.from(this.evaluations.values());
    const failed = evaluations.filter((result) => !result.passed).length;
    const total = this.evaluations.size;

    this.result = {
      passed: failed === 0,
      results: evaluations,
      message: `${failed}/${total} expected conditions not met after waiting for ${this.timeout}:
  Expression: ${this.name}
  ${evaluations.map((result) => result.message).join("\n  ------------------------------")}`
    };
  }

  protected addCondition(condition: ExpectedCondition) {
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
      }, { intervals: [250], timeout: this.timeout }).toBe(true);
    } catch (e) {
      if (!this.soft) {
        throw new Error(this.result?.message || e);
      } else {
        return this.result.passed;
      }
    }
  }
}
