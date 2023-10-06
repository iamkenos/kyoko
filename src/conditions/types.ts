export type { ExpectedCondition } from "./expected-condition";

export type { ExpectedConditions } from "./expected-conditions";

export type { LocatorCondition } from "./locator/locator-condition";

export type { LocatorConditions } from "./locator/locator-conditions";

export type { PageCondition } from "./page/page-condition";

export type { PageConditions } from "./page/page-conditions";

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
  timeout?: number,
  soft?: boolean
}
