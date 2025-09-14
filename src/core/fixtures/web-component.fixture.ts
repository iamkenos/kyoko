import type { Locator, LocatorFilters } from "playwright";

export class ComponentFixture {
  __root: string;

  constructor(selector: string, filters?: LocatorFilters) {
    return ComponentFixture.create({ prototype: this, selector, filters });
  }

  static create<T extends ComponentFixture>({ prototype, selector, from, filters }: Args): T & Locator {
    const parent = from || ctx.page.locator(selector, filters);
    const instance = new Proxy(prototype as any as T, {
      get(target, prop, receiver) {
        if (prop in target) {
          return Reflect.get(target, prop, receiver);
        }
        return Reflect.get(parent, prop, receiver);
      }
    }) as T & Locator;
    instance.__root = selector;
    return instance;
  }
}

type Args = { prototype: ComponentFixture; selector?: string; from?: Locator; filters?: LocatorFilters; };
export type WebComponent = Omit<ComponentFixture, "create" | "__root"> & Locator;
export const WebComponent: new(selector: string, filters?: LocatorFilters) => WebComponent = ComponentFixture as any;
