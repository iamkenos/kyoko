import type { Locator } from "playwright";
import type { MergeTuple } from "@common/types";

type Values = [Parameters<Locator["selectOption"]>[0]];
type ExtendedOptions = [Parameters<Locator["selectOption"]>[1] & {
  /** Whether to use partial, case-insensitive match when selecting options by label or value. Defaults to `false`. */
  caseInsensitive?: boolean;
  /** Whether to proceed normally and ignore the command if element is not visible. Ignored if `force` is set to `true`. Defaults to `false`. */
  conditional?: boolean;
}];

type Args = MergeTuple<Values, Partial<ExtendedOptions>>

export async function selectOption(this: Locator, ...args: Args) {
  const selectOption = async(...args: Args) => Object.getPrototypeOf(this).press.apply(this, args);
  const [val, options] = args;

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

    switch (typeof val) {
      case "string": {
        newval = opts.find(i => caseInsensitivePredicate(i.label, val))?.label || opts.find(i => partialMatchPredicate(i.label, val))?.label || val;
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

        if (val instanceof Array) {
          newval = val.map((v: any) => handleObjValues(v));
        } else {
          newval = handleObjValues(val);
        }
        break;
      }
    }
    return selectOption(newval, options);
  } else {
    return selectOption(...args);
  }
}
