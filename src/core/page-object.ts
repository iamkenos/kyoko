import type { This as World } from "./world";
import type { BrowserContext, Page } from "@fixtures/types";
import type { ExpectedConditionOptions } from "@conditions/types";
import type { Config, WorldParameters } from "@config/types";

export abstract class PageObject<ParametersType = WorldParameters> {
  protected readonly reporter: World["reporter"];
  protected readonly logger: World["logger"];
  protected readonly context: BrowserContext;
  protected readonly config: Config;
  protected page: Page;
  protected parameters: ParametersType;
  abstract url: string;
  abstract title: string;

  constructor() {
    this.reporter = world.reporter;
    this.logger = world.logger;
    this.context = world.context;
    this.config = world.config;
    this.page = world.page;
    this.parameters = world.parameters as any;
  }

  async navigate() {
    const url = this.page.urlFromBase(this.url);
    await this.page.goto(url as string, { waitUntil: "domcontentloaded" });
  }

  expect(options?: ExpectedConditionOptions) {
    const loaded = (preferred?: boolean) => this.page.expect(options).domContentLoaded()
      .urlEquals(this.url, preferred)
      .titleEquals(this.title, preferred);
    return {
      loaded
    };
  }
}
