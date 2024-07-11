import type { LocatorFilters } from "@commands/locator/types";
import type { Page } from "@commands/page/types";
import type { Constructor } from "@common/types";

export function component<T>(this: Page, Component: Constructor<T>, options?: LocatorFilters) {
  return new Component(options);
}
