import { ComponentFixture } from "@plugins/fixture/component/component.fixture";

import type { Locator } from "playwright";
import type { Component } from "@plugins/fixture/component/component.fixture";

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

  /** Whether to proceed normally and ignore the command if element is visible. Ignored if `force` is set to `true`. Defaults to `false`. */
  conditional?: boolean;
  /** Whether to append the supplied value on the field's current value. Defaults to `false`. */
  append?: boolean;
}

export async function fill(this: Locator | Component, value: string, options?: Options) {
  const fill = async(...args) => ComponentFixture.proto(this).fill.apply(this, args);

  const isConditional = options?.conditional && !options?.force;
  if (isConditional) {
    const { timeout = 1500 } = options;
    const canProceed = await this.waitUntil({ timeout }).displayed().poll();
    if (!canProceed) return;
  }

  const shouldAppend = options?.append;
  if (shouldAppend) {
    const current = await this.inputValue();
    await fill(current + value, options);
  } else {
    await fill(value, options);
  }
}
