import { Locator as LocatorClass } from "@commands/locator/locator";

import type { Page } from "@commands/page/types";
import type { Locator } from "@commands/locator/types";
import type { Component } from "@core/component";

function getInstance(component: Component) {
  const instance = new LocatorClass(component.root);
  const componentProto = Object.getPrototypeOf(component);
  Object.keys(component).forEach(key => instance[key] = component[key]);
  Object.getOwnPropertyNames(componentProto).filter(i => i !== "constructor").forEach(prop => instance[prop] = componentProto[prop]);
  Object.defineProperty(instance, "root", Object.getOwnPropertyDescriptor(Object.getPrototypeOf(componentProto), "root"));
  return instance;
}

export function component<T extends Component>(this: Page, Component: new(page: Page, parent: Locator) => T, parent?: Locator) {
  const component = new Component(this, parent);
  const instance = getInstance(component);
  return instance as Locator & Component & T;
}
