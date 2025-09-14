import { ComponentFixture } from "@plugins/fixture/component/component.fixture";

import type { ElementHandle, Locator } from "playwright";

type Values = null|string|ElementHandle|ReadonlyArray<string>|{
  /**
   * Matches by `option.value`. Optional.
   */
  value?: string;

  /**
   * Matches by `option.label`. Optional.
   */
  label?: string;

  /**
   * Matches by the index. Optional.
   */
  index?: number;
}|ReadonlyArray<ElementHandle>|ReadonlyArray<{
  /**
   * Matches by `option.value`. Optional.
   */
  value?: string;

  /**
   * Matches by `option.label`. Optional.
   */
  label?: string;

  /**
   * Matches by the index. Optional.
   */
  index?: number;
}>

type Options = {
  /**
   * Whether to bypass the [actionability](https://playwright.dev/docs/actionability) checks. Defaults to `false`.
   */
  force?: boolean;

  /**
   * Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You
   * can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as
   * navigating to inaccessible pages. Defaults to `false`.
   */
  noWaitAfter?: boolean;

  /**
   * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
   * option in the config, or by using the
   * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
   * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
   */
  timeout?: number;

  /** Whether to use partial, case-insensitive match when selecting options by label or value. Defaults to `false`. */
  caseInsensitive?: boolean;

  /** Whether to proceed normally and ignore the command if element is visible. Ignored if `force` is set to `true`. Defaults to `false`. */
  conditional?: boolean;
}

export async function selectOption(this: Locator, values: Values, options?: Options) {
  const selectOption = async(...args) => ComponentFixture.proto(this).selectOption.apply(this, args);
  // const [val, options] = args;

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
    return selectOption(newval, options);
  } else {
    return selectOption(values, options);
  }
}
