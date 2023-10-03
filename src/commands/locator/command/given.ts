import type { Locator } from "@commands/locator/types";

export function given(this: Locator) {
  return this.expect({ soft: true });
}
