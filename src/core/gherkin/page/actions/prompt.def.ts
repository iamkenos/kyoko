import { When } from "@cucumber/cucumber";
import { WindowPromptAction } from "../../enums";

import type { World as This } from "../../../world";

/**
 * Samples:
 * I auto accept the page dialog
 * I auto dismiss the page dialog
 */
When(
  "I auto {accept_or_dismiss} the page dialog",
  async function(this: This, action: WindowPromptAction) {
    this.page.dialogListener({ action, once: true });
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
    this.page.dialogListener({ action, once: true, text });
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
    this.page.dialogListener({ action, once: false });
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
    this.page.dialogListener({ action, text, once: false });
  }
);
