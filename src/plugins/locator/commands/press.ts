import type { Locator } from "playwright";
import type { MergeTuple } from "@common/types";

type Values = [Parameters<Locator["press"]>[0]];
type ExtendedOptions = [Parameters<Locator["press"]>[1] & {
  /** Whether to proceed normally and ignore the command if element is visible. Defaults to `false`. */
  conditional?: boolean;
}];

type Args = MergeTuple<Values, Partial<ExtendedOptions>>

export async function press(this: Locator, ...args: Args) {
  const press = async(...args: Args) => Object.getPrototypeOf(this).press.apply(this, args);
  const [, options] = args;

  const isConditional = options?.conditional;
  if (isConditional) {
    const { timeout = 1500 } = options;
    const canProceed = await this.waitUntil({ timeout }).displayed().poll();
    if (!canProceed) return;
  }

  await press(...args);
}
