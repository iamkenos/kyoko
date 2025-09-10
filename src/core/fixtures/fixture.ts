import type { BrowserContext } from "playwright";

import type { This as World } from "../world";
import type { Config, WorldParameters } from "@config/types";

export abstract class Fixture<ParametersType = WorldParameters> {
  protected _reporter: World["reporter"];
  protected _logger: World["logger"];
  protected _context: BrowserContext;
  protected _config: Config;
  protected parameters: ParametersType;

  constructor() {
    this.reporter = world.reporter;
    this.logger = world.logger;
    this.context = world.context;
    this.config = world.config;
    this.parameters = world.parameters as any;
  }

  get reporter() {
    if (!this._reporter) { this._reporter = world.reporter; }
    return this._reporter;
  }

  set reporter(reporter: World["reporter"]) {
    this._reporter = reporter;
  }

  get logger() {
    if (!this._logger) { this._logger = world.logger; }
    return this._logger;
  }

  set logger(logger: World["logger"]) {
    this._logger = logger;
  }

  get context() {
    if (!this._context) { this._context = world.context; }
    return this._context;
  }

  set context(context: BrowserContext) {
    this._context = context;
  }

  get config() {
    if (!this._config) { this._config = world.config; }
    return this._config;
  }

  set config(config: Config) {
    this._config = config;
  }
}
