import type { Locator, LocatorFilters } from "playwright";

export class ComponentFixture {
  _selector: string;
  __root: string;

  constructor(selector: string, filters?: LocatorFilters) {
    return ComponentFixture.create({ prototype: this, selector, filters });
  }

  static create<T extends ComponentFixture>({ prototype, selector, from, filters }: Args): T & Locator {
    const parent = from || ctx.page.locator(selector, filters);
    const instance = new Proxy(prototype as any as T, {
      get(target, prop, receiver) {
        if (["__proto"].includes(prop as string)) {
          return Object.getPrototypeOf(parent);
        }
        if (prop in target) {
          return Reflect.get(target, prop, receiver);
        }
        return Reflect.get(parent, prop);
      }
    }) as T & Locator;
    instance.__root = selector;
    instance._selector = selector;
    return instance;
  }

  static proto(obj: any) {
    const isComponentPrototype = obj.__root !== undefined && obj._selector !== undefined;
    if (isComponentPrototype) {
      return obj.__proto;
    } else {
      return Object.getPrototypeOf(obj);
    }
  }
}

type Args = { prototype: ComponentFixture; selector?: string; from?: Locator; filters?: LocatorFilters; };
export type Component = Omit<ComponentFixture, "create" | "proto" | "_selector" | "__root"> & Locator;
export const Component: new(selector: string, filters?: LocatorFilters) => Component = ComponentFixture as any;
