import type { Locator } from "playwright";
import type { ExpectedConditions } from "@plugins/conditions/types";
import type { Component } from "@plugins/fixture/component/component.fixture";

export async function clickUntil(this: Locator | Component, conditions: ExpectedConditions, ...args: Parameters<Locator["click"]>) {
  const fn = async() => await this.click(...args);
  await this.doUntil(fn, conditions.setName(clickUntil.name));
}
