import type { Locator } from "@fixtures/locator/types";

export function getLocatorFrom(locator: Locator) {
  return this.context().locator?.__proto?.locator(locator) ?? locator as Locator;
}
