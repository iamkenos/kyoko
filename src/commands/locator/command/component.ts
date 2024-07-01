import { Component } from "@core/component";

import type { Locator } from "@commands/locator/types";
import type { LocatorOptions, SubComponent } from "@core/component";

export function component<T extends Component>(this: Locator, SubComponent: SubComponent<T>, options?: LocatorOptions) {
  const from = new SubComponent({ locator: this }, options);
  const instance = Component["create"]<T>(from);
  return instance as T & Locator;
}
