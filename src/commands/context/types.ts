import type { BrowserContext as PlaywrightBrowserContextType } from "@playwright/test";
import type { Page } from "@commands/page/types";
import type { Config } from "@config/types";
import type { World } from "@core/world";
import type { BrowserContext as BrowserContextClassType } from "./context";
import type { closeLastPage } from "./command/close-last-page";
import type { closeOtherPages } from "./command/close-other-pages";
import type { lastPage } from "./command/last-page";
import type { newPage } from "./command/new-page";

export interface BrowserContext extends PlaywrightBrowserContextType, BrowserContextClassType {
  config: Config;
  reporter: World["reporter"];
  closeLastPage: typeof closeLastPage;
  closeOtherPages: typeof closeOtherPages;
  lastPage: typeof lastPage;
  newPage: typeof newPage;
  pages: () => Page[];
}
