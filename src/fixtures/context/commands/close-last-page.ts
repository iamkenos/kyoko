import type { BrowserContext } from "@fixtures/context/types";

export async function closeLastPage(this: BrowserContext) {
  const pages = this.pages();
  const [main] = pages;
  const [last] = pages.slice(-1);
  await last.close();

  return main;
}

export type CloseLastPageCommand = typeof closeLastPage;
