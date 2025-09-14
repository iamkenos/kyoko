import type { LocatorFilters, Page } from "playwright";
import type { Constructor } from "@utils/types";

export function component<T>(this: Page, Component: Constructor<T>, filters?: LocatorFilters) {
  return new Component(filters);
}
