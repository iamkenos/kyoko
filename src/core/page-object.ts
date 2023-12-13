import type { This as World } from "./world";
import type { BrowserContext, Page } from "@commands/types";
import type { WorldParameters } from "@config/types";

export abstract class PageObject<ParametersType = WorldParameters> {
  protected readonly reporter: World["reporter"];
  protected readonly logger: World["logger"];
  protected readonly context: BrowserContext;
  protected page: Page;
  protected parameters: ParametersType | WorldParameters;
  abstract url: string;
  abstract title: string;

  constructor(world: World) {
    this.reporter = world.reporter;
    this.logger = world.logger;
    this.context = world.context;
    this.page = world.page;
    this.parameters = world.parameters;
  }

  async navigate() {
    const url = this.page.urlFromBase(this.url);
    await this.page.goto(url as string, { waitUntil: "domcontentloaded" });
  }
}
