import { ComponentFixture } from "@plugins/fixture/component/component.fixture";

import type { LocatorFilters, Page } from "playwright";
import type { Constructor } from "@utils/types";

export function component<T>(this: Page, Component: Constructor<T>, filters?: LocatorFilters) {
  const component = new Component() as any;
  const source = this.locator(component._selector, filters);
  return ComponentFixture.create({ Component, source }) as T;
}
