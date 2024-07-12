import type { Locator } from "@fixtures/locator/types";

export async function scrollIntoView(this: Locator) {
  await this.evaluate((node: HTMLElement) => node.scrollIntoView({ behavior: "auto", block: "center", inline: "center" }));
}
