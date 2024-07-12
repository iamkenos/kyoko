
import { GenericComponent } from "@fixtures/component/component";

import type { Locator, LocatorFilters } from "@fixtures/locator/types";
import type { Constructor } from "@common/types";

export function component<T>(this: Locator, Component: Constructor<T>, filters?: LocatorFilters) {
  const prototype: any = new Component(filters);
  const from = this.locator(prototype.root);
  return GenericComponent.create({ prototype, from }) as T;
}
