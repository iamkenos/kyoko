import type { Locator } from "playwright";
import type { ExpectedConditions } from "@plugins/conditions/types";
import type { Component } from "@plugins/fixture/component/component.fixture";

export async function doUntil(this: Locator | Component, action: Function, conditions: ExpectedConditions) {
  await conditions.setAction(action).poll();
}
