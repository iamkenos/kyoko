import * as playwright from "@playwright/test";
import * as glob from "glob";
import * as path from "path";

import { IWorldOptions, World } from "@cucumber/cucumber";
import { IConfiguration } from "@cucumber/cucumber/lib/configuration";

import {
  expect,
  given,
  locator,
  scrollTo,
  scrollToBottom,
  scrollToTop,
  then
} from "@commands/page";

import { BasePage } from "./base.page";

export interface Page extends playwright.Page {
  expect: typeof expect;
  given: typeof given;
  /** Playwright's page locator extended with custom actions */
  locator: typeof locator;
  scrollToBottom: typeof scrollToBottom;
  scrollToTop: typeof scrollToTop;
  scrollTo: typeof scrollTo;
  then: typeof then;
  config: Config;
}

export interface Locator extends ReturnType<Page["locator"]> {
}

export interface Config extends Omit<IConfiguration, "worldParameters"> {
  baseDir: string;
  baseURL: string;
  browser: string;
  debug: boolean;
  headless: boolean;
  pages: string[];
  resultsDir: string;
  timeout: number;
}

export abstract class BaseWorld extends World {
  private pageObjects: string[];
  private pageObject: BasePage;
  page: Page;
  config: Config;

  constructor(options: IWorldOptions) {
    super(options);
    this.config = options.parameters.config;
    this.pageObjects = this.loadPageObjects();
  }

  private addPageCommands() {
    this.page[expect.name] = (...args: Parameters<typeof expect>) => expect.call(this.page, ...args);
    this.page[given.name] = () => given.call(this.page);
    this.page[locator.name] = (...args: Parameters<typeof locator>) => locator.call(this.page, ...args);
    this.page[scrollToBottom.name] = (...args: Parameters<typeof scrollToBottom>) => scrollToBottom.call(this.page, ...args);
    this.page[scrollToTop.name] = (...args: Parameters<typeof scrollToTop>) => scrollToTop.call(this.page, ...args);
    this.page[scrollTo.name] = (...args: Parameters<typeof scrollTo>) => scrollTo.call(this.page, ...args);
    this.page[then.name] = () => then.call(this.page);
    this.page.config = this.config;
  }

  async launchNewPageContext() {
    const launchOptions: playwright.LaunchOptions = { headless: this.config.headless };
    const contextOptions: playwright.BrowserContextOptions = {
      baseURL: this.config.baseURL,
      ignoreHTTPSErrors: false,
      viewport: { width: 1675, height: 1020 }
    };

    const browserType: playwright.BrowserType = playwright[this.config.browser];
    const browser: playwright.Browser = await browserType.launch(launchOptions);
    const context = await browser.newContext(contextOptions);

    this.page = await context.newPage() as any;
    this.addPageCommands();
  }

  loadPageObjects() {
    const resolved = new Set<string>();
    const paths = this.config.pages;

    paths.filter(Boolean).forEach((i: string): void => {
      const files = glob.sync(i);
      files.filter(Boolean).forEach((i) => resolved.add(path.resolve(i)));
    });

    return [...resolved];
  }

  findPageObject(page: string, persist = false) {
    const file = this.pageObjects.find(i => path.basename(i).split(".")[0].toLowerCase() === page.toLowerCase());

    if (!file) {
      throw new Error(`\n  Unable to resolve "${page}" from any of the available page object files:
     ${this.pageObjects.map((i) => i).join(",\n")}`);
    }

    const module = require(file);
    const entries = Object.entries(module).find(([key]) => key.toLowerCase().includes(`${page}page`));

    if (!entries) {
      throw new Error(`"${file}" doesn't have an exported page object class`);
    }

    const Clazz = entries[1] as typeof BasePage;
    const pageObject = new Clazz(this);

    if (persist) {
      this.pageObject = pageObject;
    }

    return pageObject;
  }

  findPageObjectLocator(page: string, element: string, index?: number) {
    let locator: Locator;
    try {
      const pageObject = this.pageObject || this.findPageObject(page);
      locator = pageObject.locators[element];

      if (!locator) throw new Error();
    } finally {
      locator = locator || this.page.locator(element);
      locator = index ? locator.nth(index - 1) : locator;
      return locator;
    }
  }
}
