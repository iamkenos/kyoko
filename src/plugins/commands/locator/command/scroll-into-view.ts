
import type { Locator } from "playwright";
import type { Component } from "@plugins/fixture/component/component.fixture";

export async function scrollIntoView(this: Locator | Component) {
  await this.evaluate((node: HTMLElement) => node.scrollIntoView({ behavior: "auto", block: "center", inline: "center" }));
}
