import * as playwright from "@playwright/test";
import * as path from "path";
import * as files from "@common/utils/files";

import { CucumberAllureWorld as AllureWorld } from "allure-cucumberjs";
import { BrowserContext as BrowserContextClass } from "@commands/context/context";
import { changecase } from "@common/utils/string";
import { Logger } from "./utils/logger";
import { PageObject } from "./page-object";

import type { IWorldOptions } from "@cucumber/cucumber";
import type { BrowserContext, Locator, Page } from "@commands/types";
import type { Config, WorldParameters } from "@config/types";

interface Reporter extends Pick<AllureWorld, "attach" | "step" | "issue" | "link" | "description"> { }

interface PrivateWorld {
  findPageObject: <T = PageObject>(page: string, persist?: boolean) => T;
  findPageObjectLocator: (page: string, element: string, index?: number) => Locator;
  findPageObjectProp: <T = any>(page: string, prop: string, fallback?: T) => T;
  createBrowserContext: () => void;
}

export interface This<ParametersType = WorldParameters> extends Omit<World, keyof AllureWorld | keyof PrivateWorld> {
  readonly reporter: Reporter, parameters: ParametersType, readonly context: BrowserContext;
}

export abstract class World extends AllureWorld implements PrivateWorld {
  private pageObjects: string[];
  private pageObject: PageObject;
  /** The resolved Cucumber configuration object. */
  private config: Config;
  logger: Logger;
  /** Playwright's BrowserContext instance with added custom commands and presets.
   * @see [BrowserContext](https://playwright.dev/docs/api/class-browsercontext)
   **/
  context: BrowserContext;
  /** Playwright's Page instance created from `this.context` with added custom commands and presets.
   * @see [Page](https://playwright.dev/docs/api/class-page)
   */
  page: Page;
  /** The AllureJS Cucumber reporter interface, restricted to the bare essential methods.
   * @see [allure-cucumberjs](https://github.com/allure-framework/allure-js/blob/master/packages/allure-cucumberjs/README.md)
   */
  reporter: Reporter;

  constructor(options: IWorldOptions) {
    // immutably remove config from parameters so it's not carried over as clutter as these are accessible from world.config
    const { config, ...parameters } = options.parameters;
    super({ ...options, parameters });
    this.config = config;
    this.logger = new Logger("kyoko");
    this.setPageObjects();
    this.setReporter();
    this.loadCommands();
  }

  private setPageObjects() {
    this.pageObjects = files.fromGlob(this.config.pages);
  }

  private setReporter() {
    this.reporter = {
      attach: this.attach,
      step: super.step,
      issue: super.issue,
      link: super.link,
      description: super.description
    };
  }

  private loadCommands() {
    files.fromGlob([path.join(path.dirname(__dirname), "commands/**/command/*.js")]).filter(Boolean).forEach(file => require(file));
  }

  findPageObject<T = PageObject>(page: string, persist = false) {
    const files = this.pageObjects.filter(i => path.basename(i).split(".")[0].toLowerCase() === page.toLowerCase());
    const file = files.find(i => path.basename(i).includes(`.page.${this.config.locale}`)) || files[0];

    if (!file) {
      throw new Error(`Unable to resolve "${page}" from any of the available page object files:\n  ${this.pageObjects.join(",\n  ")}`);
    }

    const module = require(file);
    const name = changecase.pascalCase(`${page}Page`);
    const clazz = Object.getOwnPropertyNames(module).find(prop => prop === name);

    if (!clazz) {
      throw new Error(`Unable to find an exported "${name}" page object class from "${file}".`);
    }

    const PageObj = module[clazz] as new (world: World) => PageObject;
    const pageObject = new PageObj(this);

    if (persist) {
      this.pageObject = pageObject;
    }

    return pageObject as unknown as T;
  }

  findPageObjectLocator(page: string, element: string, index?: number) {
    let locator: Locator;
    if (page || this.pageObject) {
      locator = this.findPageObjectProp<Locator>(page, element, this.page.locator(element));
    } else {
      locator = this.page.locator(element);
    }
    locator = index ? locator.nth(index - 1) : locator;
    return locator;
  }

  findPageObjectProp<T = any>(page: string, prop: string, fallback?: T): T {
    const pageObject = page ? this.findPageObject(page) : this.pageObject;
    return pageObject[prop] || pageObject[changecase.camelCase(prop ?? "")] || fallback || prop;
  }

  async createBrowserContext() {
    const browserType: playwright.BrowserType = playwright[this.config.browser];
    const browser = await browserType.launch(this.config.browserOptions) as any;
    const from = await browser.newContext(this.config.contextOptions);
    const context = new BrowserContextClass(from) as BrowserContext;
    context.setDefaultTimeout(this.config.timeout);
    context.reporter = this.reporter;
    context.config = this.config;
    return context;
  }
}
