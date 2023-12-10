import { Locator as LocatorClass } from "@commands/locator/locator";

import type { Page } from "@commands/page/types";
import type { Locator } from "@commands/locator/types";
import type { Component } from "@core/component";

export function component<T extends Component>(this: Page, Component: new(page: Page, parent: Locator) => T, parent?: Locator) {
  const component = new Component(this, parent);
  const getInstance = () => { const proto = new LocatorClass(component.root); Object.keys(component).filter(key => key !== "page").forEach(key => proto[key] = component[key]); return proto; };
  const instance = getInstance();
  return instance as Locator & Component & T;
}
