import type { LocatorFilters } from "@fixtures/locator/types";
import type { Page } from "@fixtures/page/types";
import type { Constructor } from "@common/types";

export function component<T>(this: Page, Component: Constructor<T>, filters?: LocatorFilters) {
  return new Component(filters);
}

export type ComponentCommand<T> = typeof component<T>;
