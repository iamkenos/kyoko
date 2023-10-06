import { Page as PageClass } from "@commands/page/page";

import type { BrowserContext } from "@commands/context/types";
import type { Page } from "@commands/page/types";

export function lastPage(this: BrowserContext) {
  const [last] = this.pages().slice(-1);
  return new PageClass(last) as Page;
}
