import { Fixture } from "./fixture";
import type { Config, WorldParameters } from "@config/types";

export abstract class WebService<ParametersType = WorldParameters> extends Fixture<ParametersType> {
  abstract url: string;
  abstract title: string;

  constructor() {
    super();
    this.context = world.context;
  }

  get config() {
    if (!this._config) { this._config = world.config; }
    return this._config;
  }

  set config(config: Config) {
    this._config = config;
  }
}
