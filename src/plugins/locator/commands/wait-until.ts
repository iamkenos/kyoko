import type { Locator } from "playwright";
import type { ExpectedConditionOptions } from "@conditions/types";

export function waitUntil(this: Locator, options?: Omit<ExpectedConditionOptions, "soft" | "name">) {
  return this.expect({ ...options, soft: true });
}
