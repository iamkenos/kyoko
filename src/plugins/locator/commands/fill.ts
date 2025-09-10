import type { Locator } from "playwright-core";
import type { MergeTuple } from "@common/types";
import type { WebComponent } from "@core/fixtures/web-component.fixture";

type Values = [Parameters<Locator["fill"]>[0]];
type ExtendedOptions = [Parameters<Locator["fill"]>[1] & {
  /** Whether to proceed normally and ignore the command if element is visible. Ignored if `force` is set to `true`. Defaults to `false`. */
  conditional?: boolean;
  /** Whether to append the supplied value on the field's current value. Defaults to `false`. */
  append?: boolean;
}];

type Args = MergeTuple<Values, Partial<ExtendedOptions>>

export async function fill(this: Locator | WebComponent, ...args: Args) {
  const fill = async(...args: Args) => Object.getPrototypeOf(this).fill.apply(this, args);
  const [val, options] = args;

  const isConditional = options?.conditional && !options?.force;
  if (isConditional) {
    const { timeout = 1500 } = options;
    const canProceed = await this.waitUntil({ timeout }).displayed().poll();
    if (!canProceed) return;
  }

  const shouldAppend = options?.append;
  if (shouldAppend) {
    const current = await this.inputValue();
    await fill(current + val, options);
  } else {
    await fill(...args);
  }
}
