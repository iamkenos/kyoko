import "playwright";

import type { IContextPlugin } from "./plugins/context/context.plugin";
import type { IPagePlugin } from "./plugins/page/page.plugin";
import type { ILocatorPlugin } from "./plugins/locator/locator.plugin";

declare module "playwright" {

  interface BrowserContext extends IContextPlugin { }

  interface Page extends IPagePlugin { }

  interface Locator extends ILocatorPlugin {
  }

  type LocatorFilters = Parameters<Locator["locator"]>[1];
}
