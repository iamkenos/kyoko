import { Fixture } from "./fixture";
import type { Page } from "playwright";
import type { ExpectedConditionKwargs, ExpectedConditionOptions } from "@conditions/types";
import type { Config, WorldParameters } from "@config/types";

export abstract class WebPage<ParametersType = WorldParameters> extends Fixture<ParametersType> {
  protected _page: Page;
  abstract url: string;
  abstract title: string;

  constructor() {
    super();
    this.context = world.context;
    this.page = world.page;
  }

  get config() {
    if (!this._config) { this._config = world.config; }
    return this._config;
  }

  set config(config: Config) {
    this._config = config;
  }

  get page() {
    if (!this._page) { this._page = world.page; }
    return this._page;
  }

  set page(page: Page) {
    this._page = page;
  }

  async navigate() {
    const url = this.page.resolvedUrlFrom(this.url);
    await this.page.goto(url as string, { waitUntil: "domcontentloaded" });
  }

  expect(options?: ExpectedConditionOptions) {
    const loaded = (kwargs: ExpectedConditionKwargs) => this.page.expect(options)
      .setName(`expect page has fully ${loaded.name}`)
      .domContentLoaded(kwargs)
      .urlEquals(this.url, kwargs)
      .titleEquals(this.title, kwargs);

    return {
      loaded
    };
  }
}
