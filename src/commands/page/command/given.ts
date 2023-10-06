import type { Page } from "@commands/page/types";
import type { ExpectedConditionOptions } from "@conditions/types";

export function given(this: Page, options?: Omit<ExpectedConditionOptions, "soft" | "name">) {
  return this.expect({ ...options, soft: true });
}
