import type { MergeTuple } from "@common/types";
import type { Locator, PlaywrightLocator } from "@fixtures/locator/types";

type Values = [Parameters<PlaywrightLocator["press"]>[0]];
type ExtendedOptions = [Parameters<PlaywrightLocator["press"]>[1] & {
  /** Whether to proceed normally and ignore the command if element is visible. Defaults to `false`. */
  conditional?: boolean;
}];

type PressArgs = MergeTuple<Values, Partial<ExtendedOptions>>

export async function press(this: Locator, ...args: PressArgs) {
  const [, options] = args;

  const isConditional = options?.conditional;
  if (isConditional) {
    const { timeout = 1500 } = options;
    const canProceed = await this.given({ timeout }).displayed().poll();
    if (!canProceed) return;
  }

  this.__proto.press(...args);
}

export type PressCommand = typeof press;
