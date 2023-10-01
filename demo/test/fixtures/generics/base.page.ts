import { BaseWorld, Page } from "./base.world";

interface IBasePage {
  /** Playwright's context page created in cucumber's world scope */
  readonly page: Page;
  /** Cucumber world */
  readonly world: BaseWorld;
  /** This page's url */
  url: string;
  /** This page's title */
  title: string;
  /** This page's locators */
}

export class BasePage implements IBasePage {
  readonly page: Page;
  readonly world: BaseWorld;
  url: string;
  title: string;

  constructor(world: BaseWorld) {
    this.world = world;
    this.page = world.page;
  }
}
