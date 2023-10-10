import type { World } from "./world";
import type { BrowserContext, Page } from "@commands/types";

export class PageObject<ParametersType = any> {
  readonly attach: World["attach"];
  parameters: ParametersType;
  context: BrowserContext;
  page: Page;
  url: string;
  title: string;

  constructor(world: World) {
    this.attach = world.attach;
    this.parameters = world.parameters;
    this.context = world.context;
    this.page = world.page;
  }
}
