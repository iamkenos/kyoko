import { Page as PageClass } from "@fixtures/page/page";

import type { BrowserContext } from "@fixtures/context/types";
import type { Page } from "@fixtures/page/types";

export function lastPage(this: BrowserContext) {
  const [last] = this.pages().slice(-1);
  return new PageClass(last) as Page;
}

export type LastPageCommand = typeof lastPage;
