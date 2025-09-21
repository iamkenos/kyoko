import { LocatorCommands } from "@plugins/commands/locator/locator.commands";
import { component } from "@plugins/commands/locator/command/component";

import type { Locator } from "playwright";

export class ComponentCommands extends LocatorCommands {
  constructor(opts = {}) {
    super(opts);
  }

  static getComponentFunctionstoPatch(target: Locator) {
    const chain = LocatorCommands
      .getLocatorFunctionstoPatch(target)
      .filter(f => ![
        // these commands should always return a locator instance
        target?.frameLocator?.name,
        target?.locator?.name
      ].includes(f))
      .filter(Boolean)
      .concat(component.name);
    return chain;
  }
}
