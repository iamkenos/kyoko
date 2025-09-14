import { CommandsPlugin } from "@plugins/commands/commands";

import type { BrowserContext, FrameLocator, Locator } from "playwright";
import type { closeLastPage } from "./command/close-last-page";
import type { closeOtherPages } from "./command/close-other-pages";

export class BrowserCommands extends CommandsPlugin {
  constructor(opts = {}) {
    super(opts);
  }

  async onContextCreated(target: BrowserContext) {
    this.addCommandsTo(target);
  }
}

export interface IBrowserCommands {
  locator: Locator | FrameLocator | undefined;
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
