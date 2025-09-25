import type { BrowserContext } from "playwright";

import type { IContext as Context } from "./context/context.fixture";
import type { ContextParameters } from "@config/types";

export abstract class Fixture<Parameters = ContextParameters> {
  private _config: Context["config"];
  private _reporter: Context["reporter"];
  private _logger: Context["logger"];
  private _browser: BrowserContext;
  protected parameters: Parameters;

  constructor() {
    this.reporter = ctx.reporter;
    this.logger = ctx.logger;
    this.browser = ctx.browser;
    this.config = ctx.config;
    this.parameters = ctx.parameters as any;
  }

  get config() {
    if (!this._config) { this._config = ctx.config; }
    return this._config;
  }

  set config(config: Context["config"]) {
    this._config = config;
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
}
