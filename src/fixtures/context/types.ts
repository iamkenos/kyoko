import type { BrowserContext as PlaywrightBrowserContext } from "@playwright/test";
import type { Page } from "@fixtures/page/types";
import type { Locator } from "@fixtures/locator/types";
import type { BrowserContext as BrowserContextClass } from "./context";
import type { closeLastPage } from "./commands/close-last-page";
import type { closeOtherPages } from "./commands/close-other-pages";
import type { lastPage } from "./commands/last-page";
import type { newPage } from "./commands/new-page";

export interface BrowserContext extends PlaywrightBrowserContext, BrowserContextClass {
  locator: Locator;
  closeLastPage(...args: Parameters<typeof closeLastPage>): ReturnType<typeof closeLastPage>;
  closeOtherPages(...args: Parameters<typeof closeOtherPages>): ReturnType<typeof closeOtherPages>;
  lastPage(...args: Parameters<typeof lastPage>): ReturnType<typeof lastPage>;
  newPage(...args: Parameters<typeof newPage>): ReturnType<typeof newPage>;
  pages: () => Page[];
}
