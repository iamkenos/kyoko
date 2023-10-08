import type { Locator } from "@commands/locator/types";
import type { ExpectedConditions } from "@conditions/types";

export async function doUntil(this: Locator, action: Function, conditions: ExpectedConditions) {
  await conditions.setAction(action).poll();
}
