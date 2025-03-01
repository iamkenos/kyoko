import { PageConditions } from "@conditions/page/page-conditions";

import type { Page } from "@fixtures/page/types";
import type { ExpectedConditionOptions } from "@conditions/types";

export function expect(this: Page, options?: ExpectedConditionOptions) {
  return new PageConditions(this, options);
}

export type ExpectCommand = typeof expect;
