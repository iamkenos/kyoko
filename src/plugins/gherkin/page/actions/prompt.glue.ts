import { WindowPromptAction } from "@plugins/gherkin/enums";

import type { Page } from "playwright";

export function dialogHandleOnce(page: Page, action: WindowPromptAction, text?: string) {
  page.dialogListener({ action, once: true, text });
}

export function dialogHandleAlways(page: Page, action: WindowPromptAction, text?: string) {
  page.dialogListener({ action, once: false, text });
}
