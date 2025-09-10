import { PageConditions } from "@conditions/page/page-conditions";

import type { Page } from "playwright";
import type { ExpectedConditionOptions } from "@conditions/types";

export function expect(this: Page, options?: ExpectedConditionOptions) {
  return new PageConditions(this, options);
}
