import * as playwright from "@playwright/test";

import { Page } from "@generics";

export async function closeLastPage(this: playwright.BrowserContext) {
  const pages = this.pages();
  const [page] = pages.slice(-1);
  await page.close();

  return pages[0] as Page;
}

