import type { Locator } from "@fixtures/locator/types";
import type { ExpectedConditionOptions } from "@conditions/types";

export function waitUntil(this: Locator, options?: Omit<ExpectedConditionOptions, "soft" | "name">) {
  return this.expect({ ...options, soft: true });
}

export type WaitUntilCommand = typeof waitUntil;
