import { ComponentCommands } from "@plugins/commands/component/component.commands";
import { Logger } from "@utils/logger";
import { propertiesOf } from "@utils/object";

import type { Locator } from "playwright";
import type { Constructor } from "@utils/types";

export class ComponentFixture {
  _selector: string;
  logger: Logger;

  constructor(selector: string) {
    this._selector = selector;
  }

  static create<T>({ Component, source }: ConstructFrom<T>): T {
    const instance: ComponentFixture = new Component() as any;
    const chain = ComponentCommands.getComponentFunctionstoPatch(Object.getPrototypeOf(source));

    const propsToRetain = propertiesOf(instance);
    const propsToDefine = propertiesOf(source).filter(p => !propsToRetain.includes(p));
    propsToDefine.forEach(p => {
      let attributes = { value: source[p] };
      if (chain.includes(p)) {
        const fn = source[p].bind(source);
        attributes = { value: (...args: any[]) => {
          const from = fn(...args);
          return ComponentFixture.create({ Component, source: from });
        } };
      }
      Object.defineProperty(instance, p, attributes);
    });
    Object.defineProperty(instance, "_selector", { value: source._selector });
    Object.defineProperty(instance, "logger", { value: ctx.logger });
    return instance as T;
  }
}

type ConstructFrom<T> = { Component: Constructor<T>, source: Locator }
export type Component<T> = Omit<T, "logger">
export const Component: new(selector: string) => Locator & ComponentFixture = ComponentFixture as any;
