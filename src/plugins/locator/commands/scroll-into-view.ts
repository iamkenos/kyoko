
import type { Locator } from "playwright";
import type { WebComponent } from "@core/fixtures/web-component.fixture";

export async function scrollIntoView(this: Locator | WebComponent) {
  await this.evaluate((node: HTMLElement) => node.scrollIntoView({ behavior: "auto", block: "center", inline: "center" }));
}
