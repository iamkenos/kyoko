
import { GenericComponent } from "@core/component";

import type { Locator, LocatorFilters } from "@commands/locator/types";
import type { Constructor } from "@common/types";

export function component<T>(this: Locator, Component: Constructor<T>, options?: LocatorFilters) {
  const instance: any = new Component(options);
  const locator: any = this.locator(instance.root);
  return GenericComponent["create"](locator._selector, instance, locator) as T;
}
