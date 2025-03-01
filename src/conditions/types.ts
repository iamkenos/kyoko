import type { ExpectedCondition } from "./expected-condition";

export type { ExpectedCondition } from "./expected-condition";

export type { ExpectedConditions } from "./expected-conditions";

export type { LocatorCondition } from "./locator/locator-condition";

export type { PageCondition } from "./page/page-condition";

export { LocatorConditions } from "./locator/locator-conditions";

export { PageConditions } from "./page/page-conditions";

export type ExpectedConditionsResult = {
  evaluations: ExpectedCondition[];
  message: string;
  passed: boolean;
};

export type ExpectedConditionOptions = {
  /** The timeout before giving up */
  timeout?: number,
  /** The polling interval or jitter value */
  interval?: number,
  /** Return the result as a boolean value instead of throwing when calling `poll()` */
  soft?: boolean
}

export type ExpectedConditionKwargs = { not?: boolean } & Record<string, any>
