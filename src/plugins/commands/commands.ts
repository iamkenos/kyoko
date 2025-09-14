import * as path from "path";

import { PuppeteerExtraPlugin } from "puppeteer-extra-plugin";

import { fromGlob } from "@utils/files";
import { changecase } from "@utils/string";

import type { Page } from "playwright";

export class CommandsPlugin extends PuppeteerExtraPlugin {
  constructor(opts = {}) {
    super(opts);
  }

  get name() {
    return this.constructor.name.toLowerCase();
  }

  protected addCommandsTo(fixture: any) {
    const ext = ".js";
    const [plugin] = changecase.split(this.constructor.name).map(i => i.toLowerCase());
    const files = fromGlob([path.join(__dirname, plugin, "command", `*${ext}`)]);
    const commands = files.map(f => changecase.camelCase(path.basename(f, ext)));

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const command = commands[i];
      fixture[command] = require(file)[command]; // monkey-patch
    }
    return fixture;
  }

  protected applyOnPageAndFrames(target: Page, callback: Function) {
    callback(target);

    for (const frame of target.frames()) {
      callback(frame);
    }

    target.on("frameattached", frame => {
      if (!frame) return;
      callback(frame);
    });
  }
}
