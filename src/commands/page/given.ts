import { Page } from "@generics";

export function given(this: Page) {
  return this.expect({ soft: true });
}
