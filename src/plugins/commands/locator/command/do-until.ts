import type { Locator } from "playwright";
import type { ExpectedConditions } from "@plugins/conditions/types";

export async function doUntil(this: Locator, action: () => Promise<void>, conditions: ExpectedConditions) {
  await conditions.setAction(action).poll();
}
