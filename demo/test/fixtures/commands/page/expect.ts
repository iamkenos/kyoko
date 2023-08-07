import { ExpectedConditionOptions, PageConditions } from "@conditions";
import { Page } from "@generics";

export function expect(this: Page, options?: ExpectedConditionOptions) {
  return new PageConditions(this, options);
}
