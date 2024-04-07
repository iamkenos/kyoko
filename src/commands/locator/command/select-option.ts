import type { Locator as PlaywrightLocatorType } from "@playwright/test";
import type { MergeTuple } from "@common/types";
import type { Locator } from "@commands/locator/types";

type Values = [Parameters<PlaywrightLocatorType["selectOption"]>[0]];
type ExtendedOptions = [Parameters<PlaywrightLocatorType["selectOption"]>[1] & {
  /** Whether to use partial, case-insensitive match when selecting options by label or value. Defaults to `false`. */
  caseInsensitive?: boolean;
  /** Whether to proceed normally and ignore the command if element is not visible. Ignored if `force` is set to `true`. Defaults to `false`. */
  conditional?: boolean;
}];

type SelectOptionArgs = MergeTuple<Values, Partial<ExtendedOptions>>

export async function selectOption(this: Locator, ...args: SelectOptionArgs) {
  const [val, options] = args;

  const isConditional = options?.conditional && !options?.force;
  if (isConditional) {
    const { timeout = 1500 } = options;
    const canProceed = await this.given({ timeout }).displayed().poll();
    if (!canProceed) return;
  }

  if (options?.caseInsensitive) {
    const opts = await this.dropdownOptions();
    const predicateOne = (i: string, v: string) => i.toLowerCase() === v.toLowerCase();
    const predicateTwo = (i: string, v: string) => i.toLowerCase().includes(v.toLowerCase());
    let newval = undefined;

    switch (typeof val) {
      case "string": {
        newval = opts.find(i => predicateOne(i.label, val))?.label || opts.find(i => predicateTwo(i.label, val))?.label || val;
        break;
      }
      case "object": {
        const handleObjValues = (obj: any) => {
          const { label, value } = obj;
          if (label) {
            return opts.find(i => predicateOne(i.label, label))?.label || opts.find(i => predicateTwo(i.label, label))?.label || obj;
          } else if (value) {
            return opts.find(i => predicateOne(i.value, value))?.label || opts.find(i => predicateTwo(i.value, value))?.label || obj;
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
    return this.__proto.selectOption(newval, options);
  } else {
    return this.__proto.selectOption(...args);
  }
}
