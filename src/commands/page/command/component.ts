
import type { Page } from "@commands/page/types";
import type { Constructor } from "@common/types";

export function component<T>(this: Page, Component: Constructor<T>) {
  return new Component();
}
