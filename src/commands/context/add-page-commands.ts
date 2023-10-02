import * as playwright from "@playwright/test";

import {
  expect,
  given,
  locator,
  scrollTo,
  scrollToBottom,
  scrollToTop
} from "@commands/page";
import { Page } from "@generics";

export function addPageCommands(this: playwright.BrowserContext | any, ...args: any) {
  const [page] = args;
  page[expect.name] = (...args: Parameters<typeof expect>) => expect.call(page, ...args);
  page[given.name] = () => given.call(page);
  page[locator.name] = (...args: Parameters<typeof locator>) => locator.call(page, ...args);
  page[scrollToBottom.name] = (...args: Parameters<typeof scrollToBottom>) => scrollToBottom.call(page, ...args);
  page[scrollToTop.name] = (...args: Parameters<typeof scrollToTop>) => scrollToTop.call(page, ...args);
  page[scrollTo.name] = (...args: Parameters<typeof scrollTo>) => scrollTo.call(page, ...args);
  page.config = this.config;
  return page as Page;
}

