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
    const baseURL = this.context.config.baseURL || "";
    const validateURL = (from: string) => {
      try {
        return new URL(from);
      } catch (e) {
        return false;
      }
    };

    const fullURL = baseURL + this.url;
    const fullURLInstance = validateURL(fullURL);
    const pageURLInstance = validateURL(this.url);
    const resolvedURLs = [pageURLInstance, fullURLInstance]; // page url takes precedence for cases where the page object defines a full page url
    const validURL = resolvedURLs.find(Boolean);

    if (validURL instanceof URL) {
      const url = validURL.href.replace(/([^:]\/)\/+/g, "$1");
      await this.page.goto(url, { waitUntil: "domcontentloaded" });
    } else {
      throw new Error(`None of the resolved URLs are valid:\n  ${[fullURL, this.url].join(",\n  ")}`);
    }
  }
}
