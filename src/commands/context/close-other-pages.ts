import * as playwright from "@playwright/test";

import { Page } from "@generics";

export async function closeOtherPages(this: playwright.BrowserContext) {
  let pages = this.pages();

  while (pages.length > 1) {
    const last = pages.slice(-1)[0];

    await last.close();
    pages = this.pages();
  }

  return pages[0] as Page;
}

