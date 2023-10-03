import { ExpectedConditionOptions, LocatorConditions } from "@conditions";

import type { Locator } from "@commands/locator/types";

export function expect(this: Locator, options?: ExpectedConditionOptions) {
  return new LocatorConditions(this, options);
}
