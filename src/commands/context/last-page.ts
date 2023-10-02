import { BrowserContext } from "@generics";

export function lastPage(this: BrowserContext) {
  const pages = this.pages();
  const [page] = pages.slice(-1);
  return this.addPageCommands(page);
}

