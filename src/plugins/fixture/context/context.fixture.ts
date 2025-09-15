import * as playwright from "playwright";
import * as pwe from "playwright-extra";
import * as path from "path";
import * as files from "@utils/files";

import StealthPlugin from "puppeteer-extra-plugin-stealth";

import { CucumberAllureWorld as AllureContext } from "allure-cucumberjs";
import { BrowserCommands } from "@plugins/commands/browser/browser.commands";
import { PageCommands } from "@plugins/commands/page/page.commands";
import { LocatorCommands } from "@plugins/commands/locator/locator.commands";
import { PageObject } from "@plugins/fixture/page/page.fixture";
import { changecase } from "@utils/string";
import { Logger } from "@utils/logger";

import type { IWorldOptions } from "@cucumber/cucumber";
import type { BrowserContext, Locator, Page } from "playwright";
import type { ContextParameters as BaseContextParameters, Config } from "@config/types";

interface Reporter extends Pick<AllureContext, "attach" | "step" | "issue" | "link" | "description"> { }

interface PrivateContext {
  findPageObject: <T = PageObject>(page: string, persist?: boolean) => T;
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

export interface IContext<ContextParameters = BaseContextParameters> extends Omit<Context, keyof AllureContext | keyof PrivateContext> {
  readonly reporter: Reporter;
  readonly browser: BrowserContext;
  readonly config: Config;
  parameters: ContextParameters;
}

export abstract class Context extends AllureContext implements PrivateContext {
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
    // immutably remove config from parameters so it's not carried over as clutter as these are accessible from ctx.config
    const { config, ...parameters } = options.parameters;
    super({ ...options, parameters });
    this.config = config;
    this.logger = new Logger("kyoko");
    this.pageObjectsFiles = files.fromGlob(this.config.pages).map(file => {
      const rex = /(.+).page(?:.([a-z]{2}))?.ts|js/;
      const [basename, name, locale] = path.basename(file).match(rex);
      return { name, locale, basename, classname: changecase.pascalCase(`${name}Page`), filepath: file };
    });
    this.reporter = {
      attach: this.attach,
      step: super.step,
      issue: super.issue,
      link: super.link,
      description: super.description
    };
    globalThis.ctx = this;
  }

  findPageObject<T = PageObject>(page?: string, persist = false) {
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

    const PageObj = module[clazz] as new () => PageObject;
    const pageObject = new PageObj();
    return pageObject as unknown as T;
  }

  findPageObjectLocator(page: string, element: string, index?: number) {
    let locator: Locator;
    if (!element) { return this.browser.locator as Locator; }
    locator = this.findPageObjectProp<Locator>(page, element, this.page.locator(element));
    locator = index ? locator.nth(index - 1) : locator;
    locator = this.browser.locator ? this.browser.locator.locator(locator) : locator;
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
    launcher.use(new BrowserCommands());
    launcher.use(new PageCommands());
    launcher.use(new LocatorCommands());

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
