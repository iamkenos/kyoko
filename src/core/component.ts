import type { Locator, Page } from "@commands/types";

export type ComponentSubClass<T extends Component> = new(page: Page, from?: Locator) => T;

export abstract class Component {
  private _page: Page;
  protected parent: Locator;
  abstract selector: string;

  constructor(page: Page, from?: Locator ) {
    this._page = page;
    this.parent = from;
  }

  get root() {
    return this.parent ? this.parent.locator(this.selector) : this._page.locator(this.selector);
  }
}
