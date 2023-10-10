import type { Locator as PlaywrightLocatorType } from "@playwright/test";
import type { MergeTuple } from "@common/types";
import type { Locator } from "@commands/locator/types";

type Values = [Parameters<PlaywrightLocatorType["press"]>[0]];
type ExtendedOptions = [Parameters<PlaywrightLocatorType["press"]>[1] & {
  /** Whether to proceed normally and ignore the command if element is not existing or visible. Defaults to `false`. */
  soft?: boolean | number;
}];

type PressArgs = MergeTuple<Values, Partial<ExtendedOptions>>

export async function press(this: Locator, ...args: PressArgs) {
  const [, options] = args;

  if (options?.soft) {
    const { soft } = options;
    const timeout = typeof soft === "number" ? soft : undefined;
    const canProceed = await this.given({ timeout }).exists().displayed().poll();
    if (!canProceed) return;
  }

  this.__proto.press(...args);
}
