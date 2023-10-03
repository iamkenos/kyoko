import type { Page } from "@commands/page/types";

export function given(this: Page) {
  return this.expect({ soft: true });
}
