import type { Locator, Page } from "@commands/types";
import type { ExcludePropertiesOf } from "@common/types";

interface ComponentInterface {
  selector: string
}

export type ComponentInstance<T> = Locator & Component & T;

export type ComponentSubClass<T> = new(page: Page, parent: Locator) => T;

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

  component<T extends Component, U extends ExcludePropertiesOf<U, Locator>>(SubComponent: ComponentSubClass<T>, parent?: U) {
    return this._page.component(SubComponent, parent);
  }
}
