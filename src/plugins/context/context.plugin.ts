import { CommandPlugin } from "@plugins/plugin";

import type { BrowserContext, Locator } from "playwright";

import type { closeLastPage } from "./commands/close-last-page";
import type { closeOtherPages } from "./commands/close-other-pages";

export class ContextPlugin extends CommandPlugin {
  constructor(opts = {}) {
    super(opts);
  }

  async onContextCreated(target: BrowserContext) {
    this.addCommandsTo(target);
  }
}


export interface IContextPlugin {
  locator: Locator
  /**
   * Closes the last page instance that was created from this context.
   *
   * Returns the first page instance in the context.
   */
  closeLastPage(...args: Parameters<typeof closeLastPage>): ReturnType<typeof closeLastPage>;
  /**
   * Closes all the other page instances that was created from this context.
   *
   * Returns the first page instance in the context.
   */
  closeOtherPages(...args: Parameters<typeof closeOtherPages>): ReturnType<typeof closeOtherPages>;
}
