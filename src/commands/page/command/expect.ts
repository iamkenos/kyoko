import type { Page } from "@commands/page/types";

import { ExpectedConditionOptions, PageConditions } from "@conditions";

export function expect(this: Page, options?: ExpectedConditionOptions) {
  return new PageConditions(this, options);
}
