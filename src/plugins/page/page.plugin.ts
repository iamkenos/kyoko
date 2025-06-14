import { CommandPlugin } from "@plugins/plugin";

import type { Page } from "@playwright/test";

export class PagePlugin extends CommandPlugin {
  constructor(opts = {}) {
    super(opts);
  }

  async onPageCreated(target: Page) {
    this.applyOnPageAndFrames(target, (target: Page) => this.addCommandsTo(target));
  }
}
