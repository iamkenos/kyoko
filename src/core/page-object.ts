import type { World } from "./world";
import type { BrowserContext, Page } from "@commands/types";

export abstract class PageObject<ParametersType = any> {
  protected readonly attach: World["attach"];
  protected readonly logger: World["logger"];
  protected parameters: ParametersType;
  protected context: BrowserContext;
  protected page: Page;
  abstract url: string;
  abstract title: string;

  constructor(world: World) {
    this.attach = world.attach;
    this.logger = world.logger;
    this.parameters = world.parameters;
    this.context = world.context;
    this.page = world.page;
  }
}
