import type { Frame, Locator } from "playwright";

type BaseArgs = Parameters<Frame["selectOption"]>
type CustomOptions = {
  /** Whether to use partial, case-insensitive match when selecting options by label or value. Defaults to `false`. */
  caseInsensitive?: boolean;
  /** Whether to proceed normally and ignore the command if element is not displayed. Ignored if `force` is set to `true`. Defaults to `false`. */
  conditional?: boolean;
}
type Extended<T extends any[]> =
  T extends [infer _, infer Values, (infer Options)?, ...infer Rest]
    ? [Values, Options & CustomOptions, ...Rest]
    : never;
type Args = Extended<BaseArgs>;

export async function selectOption(this: Locator, ...args: Args) {
  const [values, options] = args;
  const source: any = this.page().locator(this._selector);
  const frame: Frame = source._frame;

  const isConditional = options?.conditional && !options?.force;
  if (isConditional) {
    const { timeout = 1500 } = options;
    const canProceed = await this.waitUntil({ timeout }).displayed().poll();
    if (!canProceed) return;
  }

  if (options?.caseInsensitive) {
    const opts = await this.getSelectOptions();
    const caseInsensitivePredicate = (i: string, v: string) => i.toLowerCase() === v.toLowerCase();
    const partialMatchPredicate = (i: string, v: string) => i.toLowerCase().includes(v.toLowerCase());
    let newval = undefined;

    switch (typeof values) {
      case "string": {
        newval = opts.find(i => caseInsensitivePredicate(i.label, values))?.label || opts.find(i => partialMatchPredicate(i.label, values))?.label || values;
        break;
      }
      case "object": {
        const handleObjValues = (obj: any) => {
          const { label, value } = obj;
          if (label) {
            return opts.find(i => caseInsensitivePredicate(i.label, label))?.label || opts.find(i => partialMatchPredicate(i.label, label))?.label || obj;
          } else if (value) {
            return opts.find(i => caseInsensitivePredicate(i.value, value))?.label || opts.find(i => partialMatchPredicate(i.value, value))?.label || obj;
          } else {
            return obj;
          }
        };

        if (values instanceof Array) {
          newval = values.map((v: any) => handleObjValues(v));
        } else {
          newval = handleObjValues(values);
        }
        break;
      }
    }
    return frame.selectOption(this._selector, newval, options);
  } else {
    return frame.selectOption(this._selector, values, options);
  }
}
