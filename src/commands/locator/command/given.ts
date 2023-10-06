import type { Locator } from "@commands/locator/types";
import type { ExpectedConditionOptions } from "@conditions/types";

export function given(this: Locator, options?: Omit<ExpectedConditionOptions, "soft" | "name">) {
  return this.expect({ ...options, soft: true });
}
