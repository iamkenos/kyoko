import * as playwright from "@playwright/test";
import * as path from "path";
import * as files from "@common/utils/files";

import { World as CucumberWorld } from "@cucumber/cucumber";
import { BrowserContext as BrowserContextClass } from "@commands/context/context";
import { PageObject } from "./page-object";

import type { IWorldOptions } from "@cucumber/cucumber";
import type { BrowserContext, FrameLocator, Locator, Page } from "@commands/types";
import type { Config } from "@config/types";

export abstract class World<ParametersType = any> extends CucumberWorld<ParametersType> {
  private pageObjects: string[];
  private pageObject: PageObject;
  context: BrowserContext;
  page: Page;
  frame: FrameLocator;
  config: Config;

  constructor(options: IWorldOptions) {
    const { parameters, ...rest } = options;
    const newoptions: any = { ...rest, parameters: {} }; // immutably remove parameters from options because it contains the config object.
    super(newoptions);
    this.config = parameters.config;
    this.loadPageObjects();
    this.loadCommands();
  }

  private loadPageObjects() {
    this.pageObjects = files.fromGlob(this.config.pages);
  }

  private loadCommands() {
    files.fromGlob([path.join(path.dirname(__dirname), "commands/**/command/*.ts")]).filter(Boolean).forEach(file => require(file));
  }

  findPageObject(page: string, persist = false) {
    const file = this.pageObjects.find(i => path.basename(i).split(".").shift().toLowerCase() === page.toLowerCase());

    if (!file) {
      throw new Error(`\n  Unable to resolve "${page}" from any of the available page object files:
     ${this.pageObjects.map((i) => i).join(",\n")}`);
    }

    const module = require(file);
    const entries = Object.entries(module).find(([key]) => key.toLowerCase().includes(`${page}page`));

    if (!entries) {
      throw new Error(`"${file}" doesn't have an exported page object class`);
    }

    const PageObj = entries[1] as typeof PageObject;
    const pageObject = new PageObj(this);

    if (persist) {
      this.pageObject = pageObject;
    }

    return pageObject;
  }

  findPageObjectLocator(page: string, element: string, index?: number) {
    const locator = this.findPageObjectProp<Locator>(page, element, this.page.locator(element));
    return index ? locator.nth(index - 1) : locator;
  }

  findPageObjectProp<T = any>(page: string, prop: string, fallback?: T): T {
    const pageObject = this.pageObject || this.findPageObject(page);
    return pageObject[prop] || fallback || prop;
  }

  async createBrowserContext() {
    const browserType: playwright.BrowserType = playwright[this.config.browser];
    const browser = await browserType.launch(this.config.browserOptions) as any;
    const from = await browser.newContext(this.config.contextOptions);
    const context = new BrowserContextClass(from) as BrowserContext;
    context.setDefaultTimeout(this.config.timeout);
    context.config = this.config;
    return context;
  }
}
