import { LocatorConditions } from "@plugins/conditions/locator/locator-conditions";

import type { Locator } from "playwright";
import type { ExpectedConditionOptions } from "@plugins/conditions/types";

export function expect(this: Locator, options?: ExpectedConditionOptions) {
  return new LocatorConditions(this, { ...options, timeout: options?.timeout || ctx.config.timeout });
}
