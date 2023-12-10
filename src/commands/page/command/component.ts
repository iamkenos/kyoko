import { Locator as LocatorClass } from "@commands/locator/locator";

import type { Page } from "@commands/page/types";
import type { Locator } from "@commands/locator/types";
import type { ExcludePropertiesOf } from "@common/types";
import type { Component } from "@core/component";

type ComponentInstance<T> = Locator & Component & T;

type ComponentSubClass<T> = new(page: Page, parent: Locator) => T;

function getInstance(subComponent: Component) {
  const excluded = ["constructor"];
  const instance = new LocatorClass(subComponent.root);
  const subComponentProto = Object.getPrototypeOf(subComponent);
  const componentProto = Object.getPrototypeOf(subComponentProto);
  // intentional mutation going on here
  // assign properties
  Object.getOwnPropertyNames(subComponent)
    .forEach(key => instance[key] = subComponent[key]);
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

export function component<T extends Component, U extends ExcludePropertiesOf<U, Locator>>(this: Page, SubComponent: ComponentSubClass<T>, parent?: U) {
  const subComponent = new SubComponent(this, parent);
  const instance = getInstance(subComponent);
  return instance as ComponentInstance<T>;
}
