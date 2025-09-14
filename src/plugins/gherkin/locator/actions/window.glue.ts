
import type { Locator } from "playwright";
import type { Context } from "@plugins/fixture/context/context.fixture";

export function setLocatorSearchRestriction(ctx: Context, locator: Locator) {
  ctx.browser.locator = locator;
}

export function unsetLocatorSearchRestriction(ctx: Context) {
  ctx.browser.locator = undefined;
}
