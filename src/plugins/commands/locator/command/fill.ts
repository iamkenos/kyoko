import type { Frame, Locator } from "playwright";

type BaseArgs = Parameters<Frame["fill"]>
type CustomOptions = {
  /** Whether to proceed normally and ignore the command if element is not displayed. Ignored if `force` is set to `true`. Defaults to `false`. */
  conditional?: boolean;
  /** Whether to append the supplied value on the field's current value. Defaults to `false`. */
  append?: boolean;
}
type Extended<T extends any[]> =
  T extends [infer _, infer Value, (infer Options)?, ...infer Rest]
    ? [Value, Options & CustomOptions, ...Rest]
    : never;
type Args = Extended<BaseArgs>;

export async function fill(this: Locator, ...args: Args) {
  const [value, options] = args;
  const source: any = this.page().locator(this._selector);
  const frame: Frame = source._frame;

  const isConditional = options?.conditional && !options?.force;
  if (isConditional) {
    const { timeout = 1500 } = options;
    const canProceed = await this.waitUntil({ timeout }).displayed().poll();
    if (!canProceed) return;
  }

  const shouldAppend = options?.append;
  if (shouldAppend) {
    const current = await this.inputValue();
    await frame.fill(this._selector, current + value, options);
  } else {
    await frame.fill(this._selector, value, options);
  }
}
