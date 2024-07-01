import { Locator as LocatorClass } from "@commands/locator/locator";

import type { Locator, Page } from "@commands/types";

type From = { page: Page, locator?: never } | { page?: never, locator: Locator };
export type SubComponent<T extends Component> = new(from: From, options?: LocatorOptions) => T;
export type LocatorOptions = Parameters<Locator["locator"]>[1]

export abstract class Component {
  abstract selector: string;
  private _from: From;
  private _options: LocatorOptions;

  constructor(from: From, options?: LocatorOptions) {
    this._from = from;
    this._options = options;
  }

  get root() {
    return (this._from.page ?? this._from.locator as any).locator(this.selector, this._options) as Locator;
  }

  private static create<SubComponent extends Component>(sub: SubComponent) {
    const excluded = ["constructor"];
    const instance = new LocatorClass(sub.root) as SubComponent & Locator;
    const subProtoType = Object.getPrototypeOf(sub);
    const mainPrototype = Object.getPrototypeOf(subProtoType);

    // intentional mutation going on here
    // we're creating a base locator (instance) then
    // copy the subcomponents properties, methods and accessors to it.

    // assign properties
    Object.getOwnPropertyNames(sub)
      .forEach(prop => instance[prop] = sub[prop]);
    // assign methods
    Object.getOwnPropertyNames(subProtoType)
      .filter(i => !excluded.includes(i))
      .forEach(prop => instance[prop] = subProtoType[prop]);
    // assign accessors
    Object.getOwnPropertyNames(Object.getOwnPropertyDescriptors(mainPrototype))
      .filter(i => !excluded.includes(i))
      .forEach(prop =>Object.defineProperty(instance, prop, Object.getOwnPropertyDescriptor(mainPrototype, prop)));

    const { _from, _options, ...rest } = instance; // eslint-disable-line
    return rest;
  }
}
