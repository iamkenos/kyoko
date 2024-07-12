import { Then } from "@cucumber/cucumber";

import type { World as This } from "@core/world";

/**
 * Samples:
 * I expect an alert box to have been opened
 * I expect a confirm box to have been opened
 * I expect the prompt box to have been opened
 * I expect an alert box to not have been opened
 * I expect a confirm box to not have been opened
 * I expect the prompt box to not have been opened
 */
Then(
  "I expect a/an/the alert/confirm/prompt box {to_or_to_not} have been opened",
  async function(this: This, not: boolean) {
    const dialogOpened = () => this.page.dialog.handled;
    await this.page.expect().truthy(dialogOpened, !not).poll();
  }
);

/**
 * Samples:
 * I expect an alert box text to contain "string"
 * I expect a confirm box text to contain "string"
 * I expect the prompt box text to contain "string"
 * I expect an alert box text to not contain "string"
 * I expect a confirm box text to not contain "string"
 * I expect the prompt box text to not contain "string"
 */
Then(
  "I expect the alert/confirm/prompt box text {to_or_to_not} contain {input_string}",
  async function(this: This, not: boolean, expected: string) {
    await this.page.expect().dialogTextContains(expected, !not).poll();
  }
);

/**
 * Samples:
 * I expect an alert box text to be "string"
 * I expect a confirm box text to be "string"
 * I expect the prompt box text to be "string"
 * I expect an alert box text to not be "string"
 * I expect a confirm box text to not be "string"
 * I expect the prompt box text to not be "string"
 */
Then(
  "I expect the alert/confirm/prompt box text {to_or_to_not} be {input_string}",
  async function(this: This, not: boolean, expected: string) {
    await this.page.expect().dialogTextEquals(expected, !not).poll();
  }
);
