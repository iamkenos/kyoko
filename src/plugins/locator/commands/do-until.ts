import type { Locator } from "playwright";
import type { ExpectedConditions } from "@conditions/types";
import type { WebComponent } from "@core/fixtures/web-component.fixture";

export async function doUntil(this: Locator | WebComponent, action: Function, conditions: ExpectedConditions) {
  await conditions.setAction(action).poll();
}
