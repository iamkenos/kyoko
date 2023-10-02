export type { ExpectedCondition } from "../expected-condition";
export type { ExpectedConditions } from "../expected-conditions";

export type ExpectedConditionResult = {
  name: string;
  actual: any;
  expected: any;
  passed: boolean;
  message: string;
};

export type ExpectedConditionsResult = {
  results: ExpectedConditionResult[];
  message: string;
  passed: boolean;
};

export type ExpectedConditionOptions = {
  name?: string,
  timeout?: number,
  soft?: boolean
}
