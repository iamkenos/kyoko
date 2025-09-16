import { LocatorCommands } from "@plugins/commands/locator/locator.commands";
import { component } from "@plugins/commands/locator/command/component";
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
    const chain = LocatorCommands.getLocatorFunctionstoPatch(Object.getPrototypeOf(source)).concat(component.name.toLowerCase());
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
type Component = Omit<ComponentFixture, "create">
export type ComponentCommand<T> = Omit<T, "logger">
export const Component: new(selector: string) => Locator & Component = ComponentFixture as any;
