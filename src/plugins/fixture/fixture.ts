import type { BrowserContext } from "playwright";

import type { Context } from "./context/context.fixture";
import type { Config, ContextParameters } from "@config/types";

export abstract class Fixture<Parameters = ContextParameters> {
  protected _reporter: Context["reporter"];
  protected _logger: Context["logger"];
  protected _browser: BrowserContext;
  protected _config: Config;
  protected parameters: Parameters;

  constructor() {
    this.reporter = ctx.reporter;
    this.logger = ctx.logger;
    this.browser = ctx.browser;
    this.config = ctx.config;
    this.parameters = ctx.parameters as any;
  }

  get reporter() {
    if (!this._reporter) { this._reporter = ctx.reporter; }
    return this._reporter;
  }

  set reporter(reporter: Context["reporter"]) {
    this._reporter = reporter;
  }

  get logger() {
    if (!this._logger) { this._logger = ctx.logger; }
    return this._logger;
  }

  set logger(logger: Context["logger"]) {
    this._logger = logger;
  }

  get browser() {
    if (!this._browser) { this._browser = ctx.browser; }
    return this._browser;
  }

  set browser(browser: BrowserContext) {
    this._browser = browser;
  }

  get config() {
    if (!this._config) { this._config = ctx.config; }
    return this._config;
  }

  set config(config: Config) {
    this._config = config;
  }
}
