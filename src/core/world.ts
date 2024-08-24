import * as playwright from "@playwright/test";
import * as path from "path";
import * as files from "@common/utils/files";

import { CucumberAllureWorld as AllureWorld } from "allure-cucumberjs";
import { BrowserContext as BrowserContextClass } from "@fixtures/context/context";
import { changecase } from "@common/utils/string";
import { Logger } from "./utils/logger";
import { PageObject } from "./page-object";

import type { IWorldOptions } from "@cucumber/cucumber";
import type { BrowserContext, Locator, Page } from "@fixtures/types";
import type { Config, WorldParameters } from "@config/types";

interface Reporter extends Pick<AllureWorld, "attach" | "step" | "issue" | "link" | "description"> { }

interface PrivateWorld {
  config: Config;
  findPageObject: <T = PageObject>(page: string, persist?: boolean) => T;
  findPageObjectLocator: (page: string, element: string, index?: number) => Locator;
  findPageObjectProp: <T = any>(page: string, prop: string, fallback?: T) => T;
  createBrowserContext: () => void;
}

interface PageObjectFile {
  basename: string;
  classname: string;
  name: string;
  filepath: string;
  locale: string;
}

export interface This<ParametersType = WorldParameters> extends Omit<World, keyof AllureWorld | keyof PrivateWorld> {
  readonly reporter: Reporter, parameters: ParametersType, readonly context: BrowserContext;
}

export abstract class World extends AllureWorld implements PrivateWorld {
  private pageObjectsFiles: PageObjectFile[];
  private pageObjectFile: PageObjectFile;
  /** The resolved Cucumber configuration object. */
  config: Config;
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
    globalThis.world = this;
  }

  private setPageObjects() {
    this.pageObjectsFiles = files.fromGlob(this.config.pages).map(file => {
      const rex = /(.+).page(?:.([a-z]{2}))?.ts|js/;
      const [basename, name, locale] = path.basename(file).match(rex);
      return { name, locale, basename, classname: changecase.pascalCase(`${name}Page`), filepath: file };
    });
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
    files.fromGlob([path.join(path.dirname(__dirname), "fixtures/**/commands/*.js")]).filter(Boolean).forEach(file => require(file));
  }

  findPageObject<T = PageObject>(page?: string, persist = false) {
    let pageObjectFile = this.pageObjectFile;

    if (page) {
      const pageObjectFiles = this.pageObjectsFiles.filter(i => i.name === changecase.kebabCase(page));
      pageObjectFile = pageObjectFiles.find(i => i.locale === this.config.locale) || pageObjectFiles[0];

      if (persist) {
        this.pageObjectFile = pageObjectFile;
      }
    }

    if (!pageObjectFile) {
      throw new Error(`Unable to resolve "${page}" name from any of the available page object files:\n${JSON.stringify(this.pageObjectsFiles, null, 2)}`);
    }

    const module = require(pageObjectFile.filepath);
    const clazz = Object.getOwnPropertyNames(module).find(prop => prop === pageObjectFile.classname);

    if (!clazz) {
      throw new Error(`Unable to find an exported "${pageObjectFile.classname}" page object class from "${pageObjectFile.filepath}".`);
    }

    const PageObj = module[clazz] as new () => PageObject;
    const pageObject = new PageObj();
    return pageObject as unknown as T;
  }

  findPageObjectLocator(page: string, element: string, index?: number) {
    let locator: Locator;
    locator = this.findPageObjectProp<Locator>(page, element, this.page.locator(element));
    locator = index ? locator.nth(index - 1) : locator;
    return locator;
  }

  findPageObjectProp<T = any>(page: string, prop: string, fallback?: T): T {
    const [fnOrProp, ...args] = prop.split("::").map(i => i.trim());
    const pageObject = this.findPageObject(page);
    const result = pageObject[fnOrProp] || pageObject[changecase.camelCase(fnOrProp ?? "")] || fallback || fnOrProp;
    return result instanceof Function ? result(...args) : result;
  }

  async createBrowserContext() {
    const browserType: playwright.BrowserType = playwright[this.config.browser];
    const browser = await browserType.launch(this.config.browserOptions) as any;
    const playwrightContext = await browser.newContext(this.config.contextOptions);
    const context = new BrowserContextClass(playwrightContext) as BrowserContext;
    context.setDefaultTimeout(this.config.timeout);
    return context;
  }
}
