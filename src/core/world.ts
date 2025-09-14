import * as playwright from "playwright";
import * as pwe from "playwright-extra";
import * as path from "path";
import * as files from "@common/utils/files";

import StealthPlugin from "puppeteer-extra-plugin-stealth";

import { CucumberAllureWorld as AllureWorld } from "allure-cucumberjs";
import { ContextPlugin } from "@plugins/context/context.plugin";
import { PagePlugin } from "@plugins/page/page.plugin";
import { LocatorPlugin } from "@plugins/locator/locator.plugin";
import { changecase } from "@common/utils/string";
import { Logger } from "./utils/logger";
import { WebPage } from "./fixtures/web-page.fixture";

import type { BrowserContext, Locator, Page } from "playwright";
import type { IWorldOptions } from "@cucumber/cucumber";
import type { ContextParameters as BaseContextParameters, Config } from "@config/types";

interface Reporter extends Pick<AllureWorld, "attach" | "step" | "issue" | "link" | "description"> { }

interface PrivateContext {
  findPageObject: <T = WebPage>(page: string, persist?: boolean) => T;
  findPageObjectLocator: (page: string, element: string, index?: number) => Locator;
  findPageObjectProp: <T = any>(page: string, prop: string, fallback?: T) => T;
  createBrowser: () => void;
}

interface PageObjectFile {
  basename: string;
  classname: string;
  name: string;
  filepath: string;
  locale: string;
}

export interface This<ContextParameters = BaseContextParameters> extends Omit<Context, keyof AllureWorld | keyof PrivateContext> {
  readonly reporter: Reporter;
  readonly browser: BrowserContext;
  readonly config: Config;
  parameters: ContextParameters;
}

export abstract class Context extends AllureWorld implements PrivateContext {
  private pageObjectsFiles: PageObjectFile[];
  private pageObjectFile: PageObjectFile;
  /** The resolved Cucumber configuration object. */
  config: Config;
  logger: Logger;
  browser: BrowserContext;
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
    globalThis.ctx = this;
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

  findPageObject<T = WebPage>(page?: string, persist = false) {
    let pageObjectFile: PageObjectFile = this.pageObjectFile;

    if (page) {
      const pageObjectFiles = this.pageObjectsFiles.filter(i => i.name === changecase.kebabCase(page));
      pageObjectFile = pageObjectFiles.find(i => i.locale === this.config.locale) || pageObjectFiles[0];

      if (persist) {
        this.pageObjectFile = pageObjectFile;
      }
    }

    if (!pageObjectFile) {
      if (page) {
        throw new Error(`Unable to resolve "${page}" name from any of the available page object files:\n${JSON.stringify(this.pageObjectsFiles, null, 2)}`);
      } else {
        throw new Error(`Unable to load page object without a page identifier. Select one from:\n${JSON.stringify(this.pageObjectsFiles.map(i => i.name), null, 2)}`);
      }
    }

    const module = require(pageObjectFile.filepath);
    const clazz = Object.getOwnPropertyNames(module).find(prop => prop === pageObjectFile.classname);

    if (!clazz) {
      throw new Error(`Unable to find an exported "${pageObjectFile.classname}" page object class from "${pageObjectFile.filepath}".`);
    }

    const PageObj = module[clazz] as new () => WebPage;
    const pageObject = new PageObj();
    return pageObject as unknown as T;
  }

  findPageObjectLocator(page: string, element: string, index?: number) {
    let locator: Locator;
    locator = this.findPageObjectProp<Locator>(page, element, this.page.locator(element) as any); // TODO: remove any
    locator = index ? locator.nth(index - 1) : locator;
    return locator;
  }

  findPageObjectProp<T = any>(page: string, prop: string, fallback?: T): T {
    const [fnOrProp, ...args] = prop.split("::").map(i => i.trim());
    const pageObject = this.findPageObject(page);
    const result = pageObject[fnOrProp] || pageObject[changecase.camelCase(fnOrProp ?? "")] || fallback || fnOrProp;
    return result instanceof Function ? result(...args) : result;
  }

  private createLauncher() {
    const launcher: pwe.AugmentedBrowserLauncher = pwe.addExtra(playwright[this.config.browserOptions.instance]);
    launcher.use(new ContextPlugin());
    launcher.use(new PagePlugin());
    launcher.use(new LocatorPlugin());

    launcher.use(StealthPlugin()); // enable stealth by default
    return launcher;
  }

  async createBrowser() {
    const launcher = await this.createLauncher().launch(this.config.browserOptions.launchArgs);
    const browser = await launcher.newContext(this.config.browserOptions.browserContextArgs);
    browser.setDefaultTimeout(this.config.timeout);
    return browser;
  }
}
