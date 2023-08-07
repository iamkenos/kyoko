import { Page } from "@generics";

export function then(this: Page) {
  return this.expect();
}
