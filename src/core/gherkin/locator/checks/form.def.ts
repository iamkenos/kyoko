import { DataTable, Then } from "@cucumber/cucumber";
import {
  MatchContext,
  SelectOptionContext
} from "../../enums";

import type { Locator } from "@commands/locator/types";
import type { World as This } from "../../../world";

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element to be checked
 * I expect the "my-app" page's "locator" option to be selected
 * I expect the 2nd "locator" element to be checked
 * I expect the "locator" option to be selected
 * I expect the "my-app" page's 2nd "locator" element to not be checked
 * I expect the "my-app" page's "locator" option to not be selected
 * I expect the 2nd "locator" element to not be checked
 * I expect the "locator" option to not be selected
 */
Then(
  "I expect the {page_object_locator} element/option {to_or_to_not} be checked/selected/ticked",
  async function(this: This, locator: Locator, not: boolean) {
    await locator.expect().checked(!not).poll();
  }
);

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" check box to be checked
 * I expect the "my-app" page's "locator" check box to be selected
 * I expect the 2nd "locator" check box to be checked
 * I expect the "locator" check box to be selected
 * I expect the "my-app" page's 2nd "locator" check box to not be checked
 * I expect the "my-app" page's "locator" check box to not be selected
 * I expect the 2nd "locator" check box to not be checked
 * I expect the "locator" check box to not be selected
 */
Then(
  "I expect the {page_object_locator} check box {to_or_to_not} be checked/selected/ticked",
  async function(this: This, locator: Locator, not: boolean) {
    await locator.expect().checked(!not).poll();
  }
);

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" toggle item to be checked
 * I expect the "my-app" page's "locator" toggle item to be selected
 * I expect the 2nd "locator" toggle item to be checked
 * I expect the "locator" toggle item to be selected
 * I expect the "my-app" page's 2nd "locator" toggle item to not be checked
 * I expect the "my-app" page's "locator" toggle item to not be selected
 * I expect the 2nd "locator" toggle item to not be checked
 * I expect the "locator" toggle item to not be selected
 */
Then(
  "I expect the {page_object_locator} toggle item {to_or_to_not} be checked/selected/ticked",
  async function(this: This, locator: Locator, not: boolean) {
    await locator.expect().checked(!not).poll();
  }
);

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" radio button to be checked
 * I expect the "my-app" page's "locator" radio button to be selected
 * I expect the 2nd "locator" radio button to be checked
 * I expect the "locator" radio button to be selected
 * I expect the "my-app" page's 2nd "locator" radio button to not be checked
 * I expect the "my-app" page's "locator" radio button to not be selected
 * I expect the 2nd "locator" radio button to not be checked
 * I expect the "locator" radio button to not be selected
 */
Then(
  "I expect the {page_object_locator} radio button {to_or_to_not} be checked/selected/ticked",
  async function(this: This, locator: Locator, not: boolean) {
    await locator.expect().checked(!not).poll();
  }
);

/**
 * Samples:
 * I expect the option with label "label" from the "my-app" page's 2nd "locator" dropdown to be selected
 * I expect the option with value "value" from the "my-app" page's "locator" dropdown to be selected
 * I expect the option with label "label" from the 2nd "locator" dropdown to be selected
 * I expect the option with value "value" from the "locator" dropdown to be selected
 * I expect the option with label "label" from the "my-app" page's 2nd "locator" dropdown to not be selected
 * I expect the option with value "value" from the "my-app" page's "locator" dropdown to not be selected
 * I expect the option with label "label" from the 2nd "locator" dropdown to not be selected
 * I expect the option with value "value" from the "locator" dropdown to not be selected
 */
Then(
  "I expect the option with {label_or_value} {input_string} from the {page_object_locator} dropdown {to_or_to_not} be selected",
  async function(this: This, context: SelectOptionContext, expected: string, locator: Locator, not: boolean) {
    const options = await locator.dropdownOptions();
    switch (context) {
      case SelectOptionContext.LABEL: {
        await options.find(i => i.label === expected).locator.expect().selected(!not).poll();
        break;
      }
      default: {
        await options.find(i => i.value === expected).locator.expect().selected(!not).poll();
        break;
      }
    }
  }
);

/**
 * Samples:
 * I expect the option from the "my-app" page's 2nd "locator" dropdown to be selected
 * I expect the 2nd option from the "my-app" page's "locator" dropdown to be selected
 * I expect the 3rd option from the 2nd "locator" dropdown to be selected
 * I expect the 4th option from the "locator" dropdown to be selected
 * I expect the option from the "my-app" page's 2nd "locator" dropdown to not be selected
 * I expect the 2nd option from the "my-app" page's "locator" dropdown to not be selected
 * I expect the 3rd option from the 2nd "locator" dropdown to not be selected
 * I expect the 4th option from the "locator" dropdown to not be selected
 */
Then(
  "I expect the {ordinal} option from the {page_object_locator} dropdown {to_or_to_not} be selected",
  async function(this: This, expected: number, locator: Locator, not: boolean) {
    const options = await locator.dropdownOptions();
    await options.find(i => i.index === expected - 1).locator.expect().selected(!not).poll();
  }
);

/**
 * Samples:
 * I expect the options from the "my-app" page's 2nd "locator" multi select dropdown to be selected:
 * I expect the options from the "my-app" page's "locator" multi select dropdown to be selected:
 * I expect the options from the 2nd "locator" multi select dropdown to be selected:
 * I expect the options from the "locator" multi select dropdown to be selected:
 * I expect the options from the "my-app" page's 2nd "locator" multi select dropdown to not be selected:
 * I expect the options from the "my-app" page's "locator" multi select dropdown to not be selected:
 * I expect the options from the 2nd "locator" multi select dropdown to not be selected:
 * I expect the options from the "locator" multi select dropdown to not be selected:
 */
Then(
  "I expect the options from the {page_object_locator} multi select dropdown {to_or_to_not} be selected:",
  async function(this: This, locator: Locator, not: boolean, table: DataTable) {
    const options = await locator.dropdownOptions();
    const values = table.raw().slice(1).map(([context, value]) => ({ context, value: context === "index" ? +value : value }));

    for (let i = 0; i < values.length; i++) {
      const { context, value: expected } = values[i];
      switch (context) {
        case SelectOptionContext.LABEL: {
          await options.find(i => i.label === expected).locator.expect().selected(!not).poll();
          break;
        }
        case SelectOptionContext.VALUE: {
          await options.find(i => i.value === expected).locator.expect().selected(!not).poll();
          break;
        }
        default: {
          await options.find(i => i.index === expected).locator.expect().selected(!not).poll();
          break;
        }
      }
    }
  }
);

async function thenValueMatch(locator: Locator, not: boolean, context: MatchContext, expected: string) {
  switch (context) {
    case MatchContext.BE:
    case MatchContext.MATCH: {
      await locator.expect().valueEquals(expected, !not).poll();
      break;
    }
    default: {
      await locator.expect().valueContains(expected, !not).poll();
      break;
    }
  }
}

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element value to be "value"
 * I expect the "my-app" page's "locator" field value to contain "value"
 * I expect the 2nd "locator" button value to match "value"
 * I expect the "locator" component value to partially match "value"
 * I expect the "my-app" page's 2nd "locator" element value to not be "value"
 * I expect the "my-app" page's "locator" field value to not contain "value"
 * I expect the 2nd "locator" button value to not match "value"
 * I expect the "locator" component value to not partially match "value"
 */
Then(
  "I expect the {page_object_locator} element/field/button/component value {to_or_to_not} {be_or_contain} {input_string}",
  async function(this: This, locator: Locator, not: boolean, context: MatchContext, expected: string) {
    await thenValueMatch(locator, not, context, expected);
  }
);

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element value to be:
 * I expect the "my-app" page's "locator" field value to contain:
 * I expect the 2nd "locator" button value to match:
 * I expect the "locator" component value to partially match:
 * I expect the "my-app" page's 2nd "locator" element value to not be:
 * I expect the "my-app" page's "locator" field value to not contain:
 * I expect the 2nd "locator" button value to not match:
 * I expect the "locator" component value to not partially match:
 */
Then(
  "I expect the {page_object_locator} element/field/button/component value {to_or_to_not} {be_or_contain}:",
  async function(this: This, locator: Locator, not: boolean, context: MatchContext, expected: string) {
    await thenValueMatch(locator, not, context, expected);
  }
);

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element value to be empty
 * I expect the "my-app" page's "locator" field value to be empty
 * I expect the 2nd "locator" button value to be empty
 * I expect the "locator" component value to be empty
 * I expect the "my-app" page's 2nd "locator" element value to not be empty
 * I expect the "my-app" page's "locator" field value to not be empty
 * I expect the 2nd "locator" button value to not be empty
 * I expect the "locator" component value to not be empty
 */
Then(
  "I expect the {page_object_locator} element/field/button/component value {to_or_to_not} be empty",
  async function(this: This, locator: Locator, not: boolean) {
    await locator.expect().valueEmpty(!not).poll();
  }
);
