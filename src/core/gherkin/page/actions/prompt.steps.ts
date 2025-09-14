import { When } from "@cucumber/cucumber";
import { WindowPromptAction } from "@core/gherkin/enums";

import type { Context as This } from "@core/world";

import * as fn from "./prompt.glue";

/**
 * Samples:
 * I auto accept the page dialog
 * I auto dismiss the page dialog
 */
When(
  "I auto {accept_or_dismiss} the page dialog",
  async function(this: This, action: WindowPromptAction) {
    fn.dialogHandleOnce(this.page, action);
  }
);

/**
 * Samples:
 * I auto accept and type "string" on the page dialog
 * I auto dismiss and type "string" on the page dialog
 */
When(
  "I auto {accept_or_dismiss} and type {input_string} on the page dialog",
  async function(this: This, action: WindowPromptAction, text: string) {
    fn.dialogHandleOnce(this.page, action, text);
  }
);

/**
 * Samples:
 * I always auto accept the page dialogs
 * I always auto dismiss the page dialogs
 */
When(
  "I always auto {accept_or_dismiss} the page dialogs",
  async function(this: This, action: WindowPromptAction) {
    fn.dialogHandleAlways(this.page, action);
  }
);

/**
 * Samples:
 * I always auto accept and type "string" on the page dialogs
 * I always auto dismiss and type "string" on the page dialogs
 */
When(
  "I always auto {accept_or_dismiss} and type {input_string} the page dialogs",
  async function(this: This, action: WindowPromptAction, text: string) {
    fn.dialogHandleAlways(this.page, action, text);
  }
);
