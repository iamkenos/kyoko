import type { Locator, Page } from "@commands/types";

interface ComponentInterface {
  selector: string
}

export abstract class Component implements ComponentInterface {
  protected page: Page;
  protected parent: Locator;
  abstract selector: string;

  constructor(page: Page, parent?: Locator) {
    this.page = page;
    this.parent = parent;
  }

  get root() {
    return this.parent ? this.parent.locator(this.selector) : this.page.locator(this.selector);
  }
}
