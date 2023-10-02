import * as playwright from "@playwright/test";

export async function newPage(this: playwright.BrowserContext | any) {
  if (this._ownerPage) throw new Error("Please use browser.newContext()");
  const { Page } = require("node_modules/playwright-core/lib/client/page.js");

  const page = Page.from((await this._channel.newPage()).page);
  return this.addPageCommands(page);
}

