import { Locator as LocatorClass } from "@fixtures/locator/locator";

import type { Locator, PlaywrightLocator } from "@fixtures/locator/types";

export async function all(this: Locator, ...args: Parameters<PlaywrightLocator["all"]>) {
  const all = await this.__proto.all(...args);
  return all.map(locator => new LocatorClass(locator)) as Locator[];
}
