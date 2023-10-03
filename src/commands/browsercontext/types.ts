import type { BrowserContext as PlaywrightBrowserContextType } from "@playwright/test";
import type { Config } from "@generics/base.world";
import type { Page } from "@commands/page/types";
import type { BrowserContext as BrowserContextClassType } from "./browsercontext";
import type { closeLastPage } from "./command/closeLastPage";
import type { closeOtherPages } from "./command/closeOtherPages";
import type { lastPage } from "./command/lastPage";
import type { newPage } from "./command/newPage";

// @ts-ignore
export interface BrowserContext extends PlaywrightBrowserContextType, BrowserContextClassType {
  config: Config;
  closeLastPage: typeof closeLastPage;
  closeOtherPages: typeof closeOtherPages;
  lastPage: typeof lastPage;
  newPage: typeof newPage;
  pages: () => Page[];
}
