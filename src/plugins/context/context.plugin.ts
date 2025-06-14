import { CommandPlugin } from "@plugins/plugin";

import type { BrowserContext } from "@playwright/test";

export class ContextPlugin extends CommandPlugin {
  constructor(opts = {}) {
    super(opts);
  }

  async onContextCreated(target: BrowserContext) {
    this.addCommandsTo(target);
  }
}
