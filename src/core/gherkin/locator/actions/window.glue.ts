
import type { Locator } from "playwright";
import type { World } from "@core/world";

export function setLocatorSearchRestriction(world: World, locator: Locator) {
  world.context.locator = locator;
}

export function unsetLocatorSearchRestriction(world: World) {
  world.context.locator = undefined;
}
