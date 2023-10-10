import type { Locator as PlaywrightLocatorType } from "@playwright/test";
import type { MergeTuple } from "@common/types";
import type { Locator } from "@commands/locator/types";

type Values = [Parameters<PlaywrightLocatorType["fill"]>[0]];
type ExtendedOptions = [Parameters<PlaywrightLocatorType["fill"]>[1] & {
  /** Whether to proceed normally and ignore the command if element is not existing or visible. Ignored if `force` is set to `true`. Defaults to `false`. */
  soft?: boolean | number;
  /** Whether to append the supplied value on the field's current value. Defaults to `false`. */
  append?: boolean;
}];

type FillArgs = MergeTuple<Values, Partial<ExtendedOptions>>

export async function fill(this: Locator, ...args: FillArgs) {
  const [val, options] = args;

  if (options?.soft && !options?.force) {
    const { soft } = options;
    const timeout = typeof soft === "number" ? soft : undefined;
    const canProceed = await this.given({ timeout }).exists().displayed().poll();
    if (!canProceed) return;
  }

  if (options?.append) {
    const current = await this.inputValue();
    await this.__proto.fill(current + val, options);
  } else {
    await this.__proto.fill(...args);
  }
}
