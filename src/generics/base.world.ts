import * as playwright from "@playwright/test";
import * as glob from "glob";
import * as path from "path";

import { IWorldOptions, World } from "@cucumber/cucumber";
import { IConfiguration } from "@cucumber/cucumber/lib/configuration";

import { BasePage } from "./base.page";
import { BrowserContext as BrowserContextClass } from "@commands/browsercontext/browsercontext";

import type { BrowserContext } from "@commands/browsercontext/types";
import type { Locator } from "@commands/locator/types";
import type { Page } from "@commands/page/types";

export interface Config extends Omit<IConfiguration, "worldParameters"> {
  baseDir: string;
  baseURL: string;
  browser: string;
  debug: boolean;
  headless: boolean;
  pages: string[];
  resultsDir: string;
  snapshots: Snapshots;
  timeout: number;
}

type SnapshotDirectories = {
  /** Directory under `outDir` where actual files are stored for comparison */
  actualDir?: string;
  /** Directory under `outDir` where expected files are stored for comparison */
  expectedDir?: string;
  /** Directory under `outDir` where differences are stored for comparison */
  diffDir?: string;
};

type SnapshotOptions = {
  /** Directory to store the output of this comparable object in, relative to the config file */
  outDir?: string;
  /** Skip comparison, just save the actual files */
  skipCompare?: boolean;
} & SnapshotDirectories;

type ImageSnapshotOptions = {
  maxDiffPixelRatio?: number;
  mask?: Locator[];
} & SnapshotOptions

export type LocatorSnapshotOptions = ImageSnapshotOptions;

export type PageSnapshotOptions = { fullPage?: boolean } & ImageSnapshotOptions;

type Snapshots = {
  /** Options used for comparing images */
  images?: ImageSnapshotOptions;
};

export abstract class BaseWorld extends World {
  private pageObjects: string[];
  private pageObject: BasePage;
  context: BrowserContext;
  page: Page;
  config: Config;

  constructor(options: IWorldOptions) {
    super(options);
    this.config = options.parameters.config;
    this.pageObjects = this.loadPageObjects();
  }

  private loadPageObjects() {
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
      locator = pageObject[element];

      if (!locator) throw new Error();
    } finally {
      locator = locator || this.page.locator(element);
      locator = index ? locator.nth(index - 1) : locator;
      return locator;
    }
  }

  async createBrowserContext() {
    const browserType: playwright.BrowserType = playwright[this.config.browser];
    const launchOptions: playwright.LaunchOptions = { headless: this.config.headless };
    const contextOptions: playwright.BrowserContextOptions = {
      baseURL: this.config.baseURL,
      ignoreHTTPSErrors: false,
      viewport: { width: 1675, height: 1020 }
    };
    const browser = await browserType.launch(launchOptions) as any;
    const context = new BrowserContextClass(await browser.newContext(contextOptions)) as BrowserContext;
    context.config = this.config;
    return context;
  }
}
