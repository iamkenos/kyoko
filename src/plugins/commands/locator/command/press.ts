import { ComponentFixture } from "@plugins/fixture/component/component.fixture";

import type { Locator } from "playwright";

type Options = {
  /**
   * Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.
   */
  delay?: number;

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
}

export async function press(this: Locator, key: string, options?: Options) {
  const press = async(...args) => ComponentFixture.proto(this).press.apply(this, args);

  const isConditional = options?.conditional;
  if (isConditional) {
    const { timeout = 1500 } = options;
    const canProceed = await this.waitUntil({ timeout }).displayed().poll();
    if (!canProceed) return;
  }

  await press(key, options);
}
