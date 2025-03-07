import type { BrowserContext } from "@fixtures/context/types";

export async function closeOtherPages(this: BrowserContext) {
  let pages = this.pages();
  const [main] = pages;

  while (pages.length > 1) {
    const [last] = pages.slice(-1);
    await last.close();
    pages = this.pages();
  }

  return main;
}

export type CloseOtherPagesCommand = typeof closeOtherPages;
