import "playwright";

import type { IBrowserCommands } from "./plugins/commands/browser/browser.commands";
import type { IPageCommands } from "./plugins/commands/page/page.commands";
import type { IFrameCommands } from "./plugins/commands/frame/frame.commands";
import type { IFrameLocatorCommands } from "./plugins/commands/frame-locator/frame-locator.commands";
import type { ILocatorCommands } from "./plugins/commands/locator/locator.commands";
import type { fill } from "./plugins/commands/locator/command/fill";
import type { press } from "./plugins/commands/locator/command/press";
import type { selectOption } from "./plugins/commands/locator/command/select-option";

declare module "playwright" {

  interface BrowserContext extends IBrowserCommands {}

  interface Page extends IPageCommands {}

  interface Frame extends IFrameCommands {}

  interface FrameLocator extends IFrameLocatorCommands {}

  interface Locator extends ILocatorCommands {
    // these are overrides and have to be declared here again so the typings can propagate correctly
    fill(...args: Parameters<typeof fill>): ReturnType<typeof fill>;
    press(...args: Parameters<typeof press>): ReturnType<typeof press>;
    selectOption(...args: Parameters<typeof selectOption>): ReturnType<typeof selectOption>;
  }

  type LocatorFilters = Parameters<Locator["locator"]>[1];
}
