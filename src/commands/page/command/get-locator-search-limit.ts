import type { Page } from "@commands/page/types";
import type { Locator } from "@commands/locator/types";

export function getLocatorSearchLimit(this: Page, searchFor: Locator) {
  const searchFrom = (this.context().locatorSearchLimit as any)?.__proto?.locator(searchFor) ?? searchFor;
  return searchFrom;
}
