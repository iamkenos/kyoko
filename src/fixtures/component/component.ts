import { Locator as LocatorClass } from "@fixtures/locator/locator";
import { propertiesOf } from "@common/utils/object";

import type { Locator, LocatorFilters, PlaywrightLocator } from "@fixtures/types";
import type { Constructor } from "@common/types";

export class GenericComponent {
  __proto: PlaywrightLocator;
  _selector: string;
  root: string;

  constructor(selector: string, filters?: LocatorFilters) {
    return GenericComponent.create({ prototype: this, selector, filters });
  }

  static create(args: { prototype: GenericComponent, selector?: string, from?: Partial<PlaywrightLocator>, filters?: LocatorFilters }) {
    const { selector = args.from?._selector, prototype, from, filters } = args;
    const proto: GenericComponent = Object.assign(Object.create(Object.getPrototypeOf(prototype)), prototype);
    const source = from ? new LocatorClass(from) : world.page.locator(selector, filters);
    const excluded = propertiesOf({}, proto);
    const extend = propertiesOf(source).filter(i => !excluded.includes(i)).concat("__proto", "_selector");
    extend.forEach(i => proto[i] = source[i]);
    proto.root = selector;
    return proto;
  }

  chain(from: Partial<PlaywrightLocator>, instance?: GenericComponent) {
    const source = this._selector.replace(this.__proto._selector, "");
    const target = from._selector.split(" >> ").at(-1);
    const element: Partial<PlaywrightLocator> = source
      ? this.__proto.locator(source).locator(target)
      : this._selector === from._selector ? this.__proto : this.__proto.locator(target);
    const selector = element._selector;
    const chained = instance ?? this;
    from._selector = selector;
    chained._selector = selector;
    chained.__proto._selector = selector;
    return chained;
  }

  async all(...args: Parameters<Locator["all"]>) {
    const all = await this.__proto.all(...args);
    return all.map(i => GenericComponent.create({ prototype: this, from: i })) as This<this>[];
  }

  and(...args: Parameters<Locator["and"]>) {
    const and = this.__proto.and(...args);
    return this.chain(and) as This<this>;
  }

  first(...args: Parameters<Locator["first"]>) {
    const first = this.__proto.first(...args);
    return this.chain(first) as This<this>;
  }

  filter(...args: Parameters<Locator["filter"]>) {
    const filter = this.__proto.filter(...args);
    return this.chain(filter) as This<this>;
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
    const locator = this.__proto.locator(instance.root);
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
type OmitLocatorKeys = "__proto";
type OmitComponentKeys = OmitLocatorKeys | "root" | "create" | "chain";
export type Component = Omit<GenericComponent, OmitComponentKeys> & Omit<Locator, OmitLocatorKeys>;
export const Component: new(selector: string, filters?: LocatorFilters) => Component = GenericComponent as any;
