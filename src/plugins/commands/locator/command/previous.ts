import type { Locator } from "playwright";
import { XPathBuilder } from "@plugins/fixture/xpath-builder";

export function previous(this: Locator) {
  return this.page().locator(new XPathBuilder().previous().build());
}
