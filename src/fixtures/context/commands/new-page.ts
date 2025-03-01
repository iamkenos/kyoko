import { Page as PageClass } from "@fixtures/page/page";

import type { BrowserContext } from "@fixtures/context/types";
import type { Page } from "@fixtures/page/types";

export async function newPage(this: BrowserContext) {
  const from = await this.__proto.newPage();
  return new PageClass(from) as Page;
}

export type NewPageCommand = typeof newPage;
