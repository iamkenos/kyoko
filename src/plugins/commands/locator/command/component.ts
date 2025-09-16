import { ComponentCommand, ComponentFixture } from "@plugins/fixture/component/component.fixture";

import type { Locator, LocatorFilters } from "playwright";
import type { Constructor } from "@utils/types";

export function component<T>(this: Locator, Component: Constructor<T>, filters?: LocatorFilters) {
  const component: Locator = new Component() as any;
  const source = this.locator(component._selector, filters);
  return ComponentFixture.create({ Component, source }) as ComponentCommand<T>;
}
