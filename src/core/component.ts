import type { Locator, Page } from "@commands/types";

interface ComponentInterface {
  selector: string
}

export abstract class Component implements ComponentInterface {
  private _page: Page;

  protected parent: Locator;
  abstract selector: string;

  constructor(page: Page, parent?: Locator) {
    this._page = page;
    this.parent = parent;
  }

  get root() {
    return this.parent ? this.parent.locator(this.selector) : this._page.locator(this.selector);
  }
}
