import { Locator as LocatorClass } from "@commands/locator/locator";
import { propertiesOf } from "@common/utils/object";

import type { Locator as PlaywrightLocatorType } from "@playwright/test";
import type { Locator } from "@commands/types";
import type { Constructor } from "@common/types";

export class GenericComponent {
  private _selector: string;

  constructor(selector: string) {
    return GenericComponent.create(selector, this);
  }

  private static create(selector: string, prototype: GenericComponent, from?: PlaywrightLocatorType) {
    const proto = Object.assign(Object.create(Object.getPrototypeOf(prototype)), prototype);
    const source = from ? new LocatorClass(from) : _kyk_world.page.locator(selector);
    const excluded = propertiesOf({}, proto);
    const extend = propertiesOf(source).filter(i => !excluded.includes(i)).concat("_selector");
    extend.forEach(i => proto[i] = source[i]);
    proto["root"] = selector;
    return proto;
  }

  private chain(from: Proto, instance?: GenericComponent) {
    const delimiter = " >> ";
    const target = from._selector.split(delimiter).at(-1);
    const selector = this._selector.split(delimiter).filter(Boolean).concat(target).join(delimiter);
    const chained: any = instance ?? this;
    from._selector = selector;
    chained._selector = selector;
    chained.__proto._selector = selector;
    return chained;
  }

  async all(...args: Parameters<Locator["all"]>) {
    const all: Proto[] = await this["__proto"].all(...args);
    return all.map(i => GenericComponent.create(i._selector, this, i)) as This<this>[];
  }

  and(...args: Parameters<Locator["and"]>) {
    const and: Proto = this["__proto"].and(...args);
    return this.chain(and) as This<this>;
  }

  first(...args: Parameters<Locator["first"]>) {
    const first: Proto = this["__proto"].first(...args);
    return this.chain(first) as This<this>;
  }

  getByAltText(...args: Parameters<Locator["getByAltText"]>) {
    const getByAltText: Proto = this["__proto"].getByAltText(...args);
    return this.chain(getByAltText) as This<this>;
  }

  getByLabel(...args: Parameters<Locator["getByLabel"]>) {
    const getByLabel: Proto = this["__proto"].getByLabel(...args);
    return this.chain(getByLabel) as This<this>;
  }

  getByPlaceholder(...args: Parameters<Locator["getByPlaceholder"]>) {
    const getByPlaceholder: Proto = this["__proto"].getByPlaceholder(...args);
    return this.chain(getByPlaceholder) as This<this>;
  }

  getByRole(...args: Parameters<Locator["getByRole"]>) {
    const getByRole: Proto = this["__proto"].getByRole(...args);
    return this.chain(getByRole) as This<this>;
  }

  getByTestId(...args: Parameters<Locator["getByTestId"]>) {
    const getByTestId: Proto = this["__proto"].getByTestId(...args);
    return this.chain(getByTestId) as This<this>;
  }

  getByText(...args: Parameters<Locator["getByText"]>) {
    const getByText: Proto = this["__proto"].getByText(...args);
    return this.chain(getByText) as This<this>;
  }

  getByTitle(...args: Parameters<Locator["getByTitle"]>) {
    const getByTitle: Proto = this["__proto"].getByTitle(...args);
    return this.chain(getByTitle) as This<this>;
  }

  component<T>(this: Component, Component: Constructor<T>) {
    const instance: any = new Component();
    const locator: any = this["__proto"].locator(instance.root);
    return this.chain(locator, instance) as T;
  }

  last(...args: Parameters<Locator["last"]>) {
    const last: Proto = this["__proto"].last(...args);
    return this.chain(last) as This<this>;
  }

  nth(...args: Parameters<Locator["nth"]>) {
    const nth: Proto = this["__proto"].nth(...args);
    return this.chain(nth) as This<this>;
  }

  or(...args: Parameters<Locator["or"]>) {
    const or: Proto = this["__proto"].or(...args);
    return this.chain(or) as This<this>;
  }
}

type This<T> = Component & T;
type Proto = PlaywrightLocatorType & { _selector: string }
export type Component = GenericComponent & Locator;
export const Component: new (selector: string) => Component = GenericComponent as any;
