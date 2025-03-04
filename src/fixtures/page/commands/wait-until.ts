import type { Page } from "@fixtures/page/types";
import type { ExpectedConditionOptions } from "@conditions/types";

export function waitUntil(this: Page, options?: Omit<ExpectedConditionOptions, "soft" | "name">) {
  return this.expect({ ...options, soft: true });
}

export type WaitUntilCommand = typeof waitUntil;
