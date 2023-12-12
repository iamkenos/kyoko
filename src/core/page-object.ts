import type { This as World } from "./world";
import type { BrowserContext, Page } from "@commands/types";
import type { WorldParameters } from "@config/types";

export abstract class PageObject<ParametersType = WorldParameters> {
  protected readonly reporter: World["reporter"];
  protected readonly logger: World["logger"];
  protected parameters: ParametersType | WorldParameters;
  protected context: BrowserContext;
  protected page: Page;
  abstract url: string;
  abstract title: string;

  constructor(world: World) {
    this.reporter = world.reporter;
    this.logger = world.logger;
    this.parameters = world.parameters;
    this.context = world.context;
    this.page = world.page;
  }

  async navigate() {
    const url = this.page.urlFromBase(this.url);
    await this.page.goto(url as string, { waitUntil: "domcontentloaded" });
  }
}
