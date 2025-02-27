
import type { World } from "@core/world";
import type { Locator } from "@fixtures/locator/types";

export function setLocatorSearchRestriction(world: World, locator: Locator) {
  world.context.locator = locator;
}

export function unsetLocatorSearchRestriction(world: World) {
  world.context.locator = undefined;
}
