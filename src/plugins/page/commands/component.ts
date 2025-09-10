import type { LocatorFilters, Page } from "playwright";
import type { Constructor } from "@common/types";

export function component<T>(this: Page, Component: Constructor<T>, filters?: LocatorFilters) {
  return new Component(filters);
}
