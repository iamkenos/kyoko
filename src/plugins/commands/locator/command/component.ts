import { ComponentFixture } from "@plugins/fixture/component/component.fixture";

import type { Locator, LocatorFilters } from "playwright";
import type { Constructor } from "@utils/types";

export function component<T>(this: Locator, Component: Constructor<T>, filters?: LocatorFilters) {
  const prototype: ComponentFixture = new Component(filters) as any;
  const from = this.locator(prototype.__root);
  return ComponentFixture.create({ prototype, from });
}
