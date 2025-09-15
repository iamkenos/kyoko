import type { Frame, Locator } from "playwright";

type BaseArgs = Parameters<Frame["press"]>
type CustomOptions = {
  /** Whether to proceed normally and ignore the command if element is not displayed. Ignored if `force` is set to `true`. Defaults to `false`. */
  conditional?: boolean;
}
type Extended<T extends any[]> =
  T extends [infer _, infer Key, (infer Options)?, ...infer Rest]
    ? [Key, Options & CustomOptions, ...Rest]
    : never;
type Args = Extended<BaseArgs>;

export async function press(this: Locator, ...args: Args) {
  const [key, options] = args;
  const source: any = this.page().locator(this._selector);
  const frame: Frame = source._frame;

  const isConditional = options?.conditional;
  if (isConditional) {
    const { timeout = 1500 } = options;
    const canProceed = await this.waitUntil({ timeout }).displayed().poll();
    if (!canProceed) return;
  }

  await frame.press(this._selector, key, options);
}
