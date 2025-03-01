import type { Component } from "@fixtures/component/component";
import type { Locator } from "@fixtures/locator/types";

export async function scrollIntoView(this: Locator | Component) {
  await this.evaluate((node: HTMLElement) => node.scrollIntoView({ behavior: "auto", block: "center", inline: "center" }));
}

export type ScrollIntoViewCommand = typeof scrollIntoView;
