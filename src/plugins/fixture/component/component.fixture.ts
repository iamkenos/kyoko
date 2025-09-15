import { propertiesOf } from "@utils/object";

import type { Locator, LocatorFilters } from "playwright";
import type { Constructor } from "@utils/types";

export class ComponentFixture {
  __root: string;
  __proto: Locator | Component;

  constructor(selector: string, filters?: LocatorFilters) {
    return ComponentFixture.create({ prototype: this, selector, filters });
  }

  // TODO: see if we can make this work with Proxy
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
  //   return instance;
  // }

  static create<T extends ComponentFixture>(args: Args): T & Locator {
    const { selector = args.from?._selector, prototype, from, filters } = args;
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
    const isComponentPrototype = obj.__root !== undefined;
    if (isComponentPrototype) {
      return Object.getPrototypeOf(obj.__proto);
    } else {
      return Object.getPrototypeOf(obj);
    }
  }

  chain(this: This<any>, from: Partial<Locator>, instance?: ComponentFixture) {
    const source = this._selector.replace(this.__proto._selector, "");
    const target = from._selector.split(" >> ").at(-1);
    const element: Partial<Locator> = source
      ? this.__proto.locator(source).locator(target)
      : this._selector === from._selector ? this.__proto : this.__proto.locator(target);
    const selector = element._selector;
    const chained: any = instance ?? this;
    from._selector = selector;
    chained._selector = selector;
    chained.__proto._selector = selector;
    return chained as Component;
  }

  async all(...args: Parameters<Locator["all"]>) {
    const all = await this.__proto.all(...args);
    return all.map(i => ComponentFixture.create({ prototype: this, from: i })) as This<this>[];
  }

  and(...args: Parameters<Locator["and"]>) {
    const and = this.__proto.and(...args);
    return this.chain(and) as This<this>;
  }

  filter(...args: Parameters<Locator["filter"]>) {
    const filter = this.__proto.filter(...args);
    return this.chain(filter) as This<this>;
  }

  first(...args: Parameters<Locator["first"]>) {
    const first = this.__proto.first(...args);
    return this.chain(first) as This<this>;
  }

  getByAltText(...args: Parameters<Locator["getByAltText"]>) {
    const getByAltText = this.__proto.getByAltText(...args);
    return this.chain(getByAltText) as This<this>;
  }

  getByLabel(...args: Parameters<Locator["getByLabel"]>) {
    const getByLabel = this.__proto.getByLabel(...args);
    return this.chain(getByLabel) as This<this>;
  }

  getByPlaceholder(...args: Parameters<Locator["getByPlaceholder"]>) {
    const getByPlaceholder = this.__proto.getByPlaceholder(...args);
    return this.chain(getByPlaceholder) as This<this>;
  }

  getByRole(...args: Parameters<Locator["getByRole"]>) {
    const getByRole = this.__proto.getByRole(...args);
    return this.chain(getByRole) as This<this>;
  }

  getByTestId(...args: Parameters<Locator["getByTestId"]>) {
    const getByTestId = this.__proto.getByTestId(...args);
    return this.chain(getByTestId) as This<this>;
  }

  getByText(...args: Parameters<Locator["getByText"]>) {
    const getByText = this.__proto.getByText(...args);
    return this.chain(getByText) as This<this>;
  }

  getByTitle(...args: Parameters<Locator["getByTitle"]>) {
    const getByTitle = this.__proto.getByTitle(...args);
    return this.chain(getByTitle) as This<this>;
  }

  component<T>(Component: Constructor<T>, options?: LocatorFilters) {
    const instance: any = new Component(options);
    const locator = this.__proto.locator(instance.__root);
    return this.chain(locator, instance) as T;
  }

  last(...args: Parameters<Locator["last"]>) {
    const last = this.__proto.last(...args);
    return this.chain(last) as This<this>;
  }

  nth(...args: Parameters<Locator["nth"]>) {
    const nth = this.__proto.nth(...args);
    return this.chain(nth) as This<this>;
  }

  or(...args: Parameters<Locator["or"]>) {
    const or = this.__proto.or(...args);
    return this.chain(or) as This<this>;
  }
}

type This<T> = Component & T;
type Args = { prototype: ComponentFixture; selector?: string; from?: Locator | Component; filters?: LocatorFilters; };
type OmitComponentKeys = "create" | "proto" | "chain" | "__root" | "__proto";
export type Component = Omit<ComponentFixture, OmitComponentKeys> & Locator;
export const Component: new(selector: string, filters?: LocatorFilters) => Component = ComponentFixture as any;
