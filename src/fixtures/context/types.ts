import type { BrowserContext as PlaywrightBrowserContext } from "@playwright/test";
import type { Page } from "@fixtures/page/types";
import type { Locator } from "@fixtures/locator/types";
import type { BrowserContext as BrowserContextClass } from "./context";
import type { CloseLastPageCommand } from "./commands/close-last-page";
import type { CloseOtherPagesCommand } from "./commands/close-other-pages";
import type { LastPageCommand } from "./commands/last-page";
import type { NewPageCommand } from "./commands/new-page";

export interface BrowserContext extends PlaywrightBrowserContext, BrowserContextClass {
  locator: Locator;
  closeLastPage(...args: Parameters<CloseLastPageCommand>): ReturnType<CloseLastPageCommand>;
  closeOtherPages(...args: Parameters<CloseOtherPagesCommand>): ReturnType<CloseOtherPagesCommand>;
  lastPage(...args: Parameters<LastPageCommand>): ReturnType<LastPageCommand>;
  newPage(...args: Parameters<NewPageCommand>): ReturnType<NewPageCommand>;
  pages: () => Page[];
}
