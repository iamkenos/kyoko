import { Locator as LocatorClass } from "@commands/locator/locator";

import type { Page } from "@commands/page/types";
import type { Locator } from "@commands/locator/types";
import type { Component, ComponentSubClass } from "@core/component";

function getInstance<T extends Component>(subClassInstance: T) {
  const excluded = ["constructor"];
  const instance = new LocatorClass(subClassInstance.root) as T & Locator;
  const subComponentProto = Object.getPrototypeOf(subClassInstance);
  const componentProto = Object.getPrototypeOf(subComponentProto);
  // intentional mutation going on here
  // assign properties
  Object.getOwnPropertyNames(subClassInstance)
    .forEach(prop => instance[prop] = subClassInstance[prop]);
  // assign methods
  Object.getOwnPropertyNames(subComponentProto)
    .filter(i => !excluded.includes(i))
    .forEach(prop => instance[prop] = subComponentProto[prop]);
  // assign accessors
  Object.getOwnPropertyNames(Object.getOwnPropertyDescriptors(componentProto))
    .filter(i => !excluded.includes(i))
    .forEach(prop =>Object.defineProperty(instance, prop, Object.getOwnPropertyDescriptor(componentProto, prop)));
  return instance;
}

export function component<T extends Component>(this: Page, SubClass: ComponentSubClass<T>, options?: { from?: Locator }) {
  const subClassInstance = new SubClass(this, options?.from);
  const instance = getInstance<T>(subClassInstance);
  return instance;
}
