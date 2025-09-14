import { propertiesOf } from "@utils/object";

import type { Locator, LocatorFilters } from "playwright";
import type { Constructor } from "@utils/types";

export class ComponentFixture {
  __root: string;
  __proto: Locator | Component;

  constructor(selector: string, filters?: LocatorFilters) {
    return ComponentFixture.create({ prototype: this, selector, filters });
  }

  // static create<T extends ComponentFixture>({ prototype, selector, from, filters }: Args): T & Locator {
  //   const parent = from || ctx.page.locator(selector, filters);
  //   const instance = new Proxy(prototype as any as T, {
  //     get(target, prop, receiver) {
  //       if (prop in target) {
  //         return Reflect.get(target, prop, receiver);
  //       }
  //       return parent[prop]; // forward to locator
  //     }
  //   }) as T & Locator;
  //   instance.__root = parent["_selector"];

  //   // instance here can have multiple custom methods but doing the line below loses them all
  //   Object.setPrototypeOf(instance, Object.getPrototypeOf(parent));
  //   return instance;
  // }

  static create<T extends ComponentFixture>(this: any, args: Args): T & Locator {
    const { selector = args.from?.["_selector"], prototype, from, filters } = args;
    const instance: ComponentFixture = Object.assign(Object.create(Object.getPrototypeOf(prototype)), prototype);
    const source = from ?? ctx.page.locator(selector, filters);
    const excluded = propertiesOf({}, instance);
    const extend = propertiesOf(source).filter(i => !excluded.includes(i)).concat("_selector");
    extend.forEach(i => instance[i] = source[i]);
    instance.__root = selector;
    instance.__proto = source;
    return instance as T & Locator;
  }

  static proto(obj: any): Locator | Component {
    const isComponentPrototype = obj.__root !== undefined && obj._selector !== undefined;
    if (isComponentPrototype) {
      return Object.getPrototypeOf(obj.__proto);
    } else {
      return Object.getPrototypeOf(obj);
    }
  }

  component<T>(Component: Constructor<T>, filters?: LocatorFilters) {
    const prototype: ComponentFixture = new Component(filters) as any;
    const from = ComponentFixture.proto(prototype);
    return ComponentFixture.create({ prototype, from }) as T;
  }
}

type Args = { prototype: ComponentFixture; selector?: string; from?: Locator | Component; filters?: LocatorFilters; };
export type Component = Omit<ComponentFixture, "create" | "proto" | "_selector" | "__root" | "__proto"> & Locator;
export const Component: new(selector: string, filters?: LocatorFilters) => Component = ComponentFixture as any;
