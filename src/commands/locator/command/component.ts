
import type { Locator } from "@commands/locator/types";
import type { Constructor } from "@common/types";
import { GenericComponent } from "@core/component";

export function component<T>(this: Locator, Component: Constructor<T>) {
  const instance: any = new Component();
  const locator: any = this.locator(instance.root);
  return GenericComponent["create"](locator._selector, instance, locator) as T;
}
