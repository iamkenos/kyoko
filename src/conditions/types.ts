import type { ExpectedCondition } from "./expected-condition";

export type { ExpectedCondition } from "./expected-condition";

export type { ExpectedConditions } from "./expected-conditions";

export type { LocatorCondition } from "./locator/locator-condition";

export type { LocatorConditions } from "./locator/locator-conditions";

export type { PageCondition } from "./page/page-condition";

export type { PageConditions } from "./page/page-conditions";

export type ExpectedConditionsResult = {
  evaluations: ExpectedCondition[];
  message: string;
  passed: boolean;
};

export type ExpectedConditionOptions = {
  timeout?: number,
  interval?: number,
  soft?: boolean
}

export type ExpectedConditionKwargs = { not?: boolean } & Record<string, any>
