import type { This as World } from "./world";
import type { BrowserContext, Page } from "@commands/types";
import type { ExpectedConditionOptions } from "@conditions/types";
import type { WorldParameters } from "@config/types";

export abstract class PageObject<ParametersType = WorldParameters> {
  protected readonly reporter: World["reporter"];
  protected readonly logger: World["logger"];
  protected readonly context: BrowserContext;
  protected page: Page;
  protected parameters: ParametersType;
  abstract url: string;
  abstract title: string;

  constructor() {
    this.reporter = _kyk_world.reporter;
    this.logger = _kyk_world.logger;
    this.context = _kyk_world.context;
    this.page = _kyk_world.page;
    this.parameters = _kyk_world.parameters as any;
  }

  async navigate() {
    const url = this.page.urlFromBase(this.url);
    await this.page.goto(url as string, { waitUntil: "domcontentloaded" });
  }

  expect(options?: ExpectedConditionOptions) {
    const loaded = () => this.page.expect(options).domContentLoaded().urlEquals(this.url).titleEquals(this.title);
    return {
      loaded
    };
  }
}
