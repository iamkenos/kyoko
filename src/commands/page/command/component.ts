import { Component } from "@core/component";

import type { Locator } from "@commands/locator/types";
import type { Page } from "@commands/page/types";
import type { LocatorOptions, SubComponent } from "@core/component";

export function component<T extends Component>(this: Page, SubComponent: SubComponent<T>, options?: LocatorOptions) {
  const from = new SubComponent({ page: this }, options);
  const instance = Component["create"]<T>(from);
  return instance as T & Locator;
}
