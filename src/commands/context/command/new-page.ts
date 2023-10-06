import { Page as PageClass } from "@commands/page/page";

import type { BrowserContext } from "@commands/context/types";
import type { Page } from "@commands/page/types";

export async function newPage(this: BrowserContext | any) {
  if (this._ownerPage) throw new Error("Please use browser.newContext()");
  const { Page: PlaywrightPage } = require("node_modules/playwright-core/lib/client/page.js");
  return new PageClass(PlaywrightPage.from((await this._channel.newPage()).page)) as Page;
}
