import * as playwright from "@playwright/test";
import * as path from "path";
import * as files from "@common/utils/files";

import { CucumberAllureWorld } from "allure-cucumberjs";
import { BrowserContext as BrowserContextClass } from "@commands/context/context";
import { changecase } from "@common/utils/string";
import { PageObject } from "./page-object";

import log from "@wdio/logger";

import type { IWorldOptions } from "@cucumber/cucumber";
import type { BrowserContext, Locator, Page } from "@commands/types";
import type { Config } from "@config/types";

// @ts-ignore
export abstract class World<ParametersType = any> extends CucumberAllureWorld {
  private log: IWorldOptions["log"];
  private pageObjects: string[];
  private pageObject: PageObject;
  context: BrowserContext;
  logger: ReturnType<typeof log>;
  page: Page;
  config: Config;
  // @ts-ignore
  parameters: ParametersType;

  constructor(options: IWorldOptions) {
    // immutably remove config from parameters so it's not carried over as clutter as these are accessible from world.config
    const { config, ...parameters } = options.parameters;
    super({ ...options, parameters });
    this.config = config;
    this.loadLogger();
    this.loadPageObjects();
    this.loadCommands();
  }

  private loadLogger() {
    const suffix = process.env.CUCUMBER_PARALLEL === "true" ? `[${process.env.CUCUMBER_WORKER_ID}]` : "";
    this.logger = log(`kyoko${suffix}`);
    this.logger.setLevel(this.config.logLevel);
    this.logger.info("Starting worker...");
  }

  private loadPageObjects() {
    this.pageObjects = files.fromGlob(this.config.pages);
  }

  private loadCommands() {
    files.fromGlob([path.join(path.dirname(__dirname), "commands/**/command/*.js")]).filter(Boolean).forEach(file => require(file));
  }


  findPageObject<T = PageObject>(page: string, persist = false) {
    const files = this.pageObjects.filter(i => path.basename(i).split(".")[0].toLowerCase() === page.toLowerCase());
    const file = files.find(i => path.basename(i).includes(`.page.${this.config.locale}`)) || files[0];

    if (!file) {
      throw new Error(`\n  Unable to resolve "${page}" from any of the available page object files:
     ${this.pageObjects.map((i) => i).join(",\n")}`);
    }

    const module = require(file);
    const entries = Object.entries(module).find(([key]) => key === changecase.pascalCase(`${page}Page`));

    if (!entries) {
      throw new Error(`"${file}" doesn't have an exported page object class`);
    }

    const PageObj = entries[1] as typeof PageObject;
    const pageObject = new PageObj(this);

    if (persist) {
      this.pageObject = pageObject;
    }

    return pageObject as T;
  }

  findPageObjectLocator(page: string, element: string, index?: number) {
    let locator = this.findPageObjectProp<Locator>(page, element, this.page.locator(element));
    locator = index ? locator.nth(index - 1) : locator;
    return locator;
  }

  findPageObjectProp<T = any>(page: string, prop: string, fallback?: T): T {
    const pageObject = page ? this.findPageObject(page) : this.pageObject;
    return pageObject[prop] || fallback || prop;
  }

  async createBrowserContext() {
    const browserType: playwright.BrowserType = playwright[this.config.browser];
    const browser = await browserType.launch(this.config.browserOptions) as any;
    const from = await browser.newContext(this.config.contextOptions);
    const context = new BrowserContextClass(from) as BrowserContext;
    context.setDefaultTimeout(this.config.timeout);
    context.attach = this.attach;
    context.config = this.config;
    return context;
  }
}
