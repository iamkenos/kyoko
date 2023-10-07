import { expect } from "@playwright/test";

import type { Locator } from "@commands/locator/types";

export async function isFocused(this: Locator) {
  try {
    await expect(this).toBeFocused({ timeout: 50 });
    return true;
  } catch (e) {
    return false;
  }
}

