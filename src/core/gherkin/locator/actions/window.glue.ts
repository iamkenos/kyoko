
import type { Locator } from "playwright";
import type { Context } from "@core/world";

export function setLocatorSearchRestriction(world: Context, locator: Locator) {
  world.browser.locator = locator;
}

export function unsetLocatorSearchRestriction(world: Context) {
  world.browser.locator = undefined;
}
