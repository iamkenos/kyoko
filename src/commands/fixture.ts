import * as glob from "glob";
import * as path from "path";

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
  __proto: T;
  constructor(from: T) {
    this.__proto = Object.assign(Object.create(Object.getPrototypeOf(from)), from);
    return this.addCommands(from);
  }

  private addCommands(instance: any) {
    const ext = ".ts";
    const files = glob.sync(path.join(__dirname, this.constructor.name.toLowerCase(), "command", `*${ext}`));

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const name = path.basename(file, ext);
      const fn = require(file)[name];
      instance[fn.name] = (...args: any) => fn.call(instance, ...args);
    }

    instance.__proto = this.__proto;
    return instance;
  }
}
