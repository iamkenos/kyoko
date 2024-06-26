import { Page as PageClass } from "@commands/page/page";

import type { BrowserContext } from "@commands/context/types";
import type { Page } from "@commands/page/types";

export async function newPage(this: BrowserContext) {
  const from = await this["__proto"].newPage();
  return new PageClass(from) as Page;
}
