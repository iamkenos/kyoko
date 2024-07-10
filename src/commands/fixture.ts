import * as path from "path";

import { fromGlob } from "@common/utils/files";
import { changecase } from "@common/utils/string";

/** Allows the addition of custom commands to the following Playwright fixtures:
 * - Context
 * - Page
 * - Locator
 * - FrameLocator
 *
 * Exposes a property `__proto` which is a copy of the original, unmodified fixture.
 */
export class Fixture<T> {
  /** The unmodified version of this prototype. */
  private __proto: T;
  constructor(from: T) {
    this.__proto = Object.assign(Object.create(Object.getPrototypeOf(from)), from);
    return this.addCommands(from);
  }

  private addCommands(instance: any) {
    const ext = ".js";
    const parts = changecase.split(this.constructor.name);
    const fixtureDir = parts.length > 1 ? `{${parts.join()}}` : parts[0];
    const files = fromGlob([path.join(__dirname, fixtureDir, "command", `*${ext}`)]);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const name = changecase.camelCase(path.basename(file, ext));
      const fn = require(file)[name];
      instance[name] = fn;
    }

    instance.__proto = this.__proto;
    return instance;
  }
}
