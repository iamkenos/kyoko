import { expect } from "@playwright/test";

import { changecase } from "@utils/string";
import { ArrayContains } from "./context/condition/array-contains";
import { ArrayEquals } from "./context/condition/array-equals";
import { Equals } from "./context/condition/equals";
import { FileExists } from "./context/condition/file-exists";

import type { ExpectedCondition } from "./expected-condition";
import type { ExpectedConditionKwargs, ExpectedConditionOptions, ExpectedConditionsResult } from "./types";

export class ExpectedConditions {
  protected name: string;

  private conditions: ExpectedCondition[];

  private result: ExpectedConditionsResult;

  private timeout: number;

  private interval: number;

  private action: Function;

  private soft: boolean;

  constructor(options?: ExpectedConditionOptions) {
    this.name = changecase.capitalCase(this.constructor.name);
    this.conditions = [];
    this.timeout = options?.timeout || ctx.config.timeout;
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
  Expression: ${this.name}${this["locator"] ? `\n  Locator: ${this["locator"]["_selector"]}` : ""}
  ${evaluations.map((result) => result.message).join("\n  ------------------------------")}

  Traceback:`
    };
  }

  addCondition(condition: ExpectedCondition | ExpectedConditions) {
    const [idx, pg, loc, sel, kw, cd] = ["index", "page", "locator", "_selector", "kwargs", "conditions"];
    if (condition instanceof ExpectedConditions) {
      const conditions = condition[cd];
      conditions.forEach((i: ExpectedCondition) => i[kw] = { ...(i[loc] ? { ...i[kw], locator: i[loc][sel] } : {}) });
      this.conditions = this.conditions.concat(conditions);
    } else {
      condition[idx] = this.conditions.length;
      condition[loc] = this[loc];
      condition[pg] = this[pg];
      this.conditions.push(condition);
    }
    return this;
  }

  setAction(action: Function) {
    this.action = action;
    return this;
  }

  setName(name: string) {
    this.name = changecase.sentenceCase(name);
    return this;
  }

  arrayContains<T>(actual: Array<T>, expected: Array<T>, kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new ArrayContains(actual, expected, kwargs));
  }

  arrayEquals<T>(actual: Array<T>, expected: Array<T>, kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new ArrayEquals(actual, expected, kwargs));
  }

  equals<T = any>(actual: T, expected: T, kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new Equals(actual, expected, kwargs));
  }

  fileExists(path: string, kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new FileExists(path, kwargs));
  }

  async poll() {
    try {
      await expect.poll(async() => {
        this.action !== undefined && await this.action();
        await this.evaluateAll();
        return this.result.passed;
      }, { intervals: [this.interval], timeout: this.timeout + 250 }).toBe(true);
    } catch (e) {
      if (this.result) {
        if (!this.soft) {
          const failures = this.result.evaluations.filter(e => !e.passed);
          for (let i = 0; i < failures.length; i++) { await failures[i].onFailure(); }
          throw new Error(this.result.message);
        }
      } else {
        throw new Error(`Unhandled exception: ${e}`);
      }
    }
    this.conditions = [];
    return this.result.passed;
  }
}
