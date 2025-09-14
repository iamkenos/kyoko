import type { Page } from "playwright";
import type { ExpectedConditionOptions } from "@plugins/conditions/types";

export function waitUntil(this: Page, options?: Omit<ExpectedConditionOptions, "soft" | "name">) {
  return this.expect({ ...options, soft: true });
}
