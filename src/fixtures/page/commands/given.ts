import type { Page } from "@fixtures/page/types";
import type { ExpectedConditionOptions } from "@conditions/types";

export function given(this: Page, options?: Omit<ExpectedConditionOptions, "soft" | "name">) {
  return this.expect({ ...options, soft: true });
}

export type GivenCommand = typeof given;
