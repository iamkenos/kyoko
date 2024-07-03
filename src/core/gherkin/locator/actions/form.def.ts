import { DataTable, When } from "@cucumber/cucumber";
import {
  SelectOptionContext,
  SetValueAction,
  ToggleAction
} from "../../enums";

import type { Locator } from "@commands/locator/types";
import type { World as This } from "../../../world";

/**
 * Samples:
 * I clear the "my-app" page's 2nd "locator" element
 * I clear the "my-app" page's "locator" field
 * I clear the 2nd "locator" element
 * I clear the "locator" field
 */
When(
  "I clear the {page_object_locator} element/field",
  async function(this: This, locator: Locator) {
    await locator.clear();
  }
);

async function whenTypeOnField(locator: Locator, value: string, action: SetValueAction) {
  switch (action) {
    case SetValueAction.APPEND: {
      await locator.fill(value, { append: true });
      break;
    }
    default: {
      await locator.fill(value);
      break;
    }
  }
}

/**
 * Samples:
 * I type "value" on the "my-app" page's 2nd "locator" element
 * I type "value" on the "my-app" page's "locator" field
 * I type "value" on the 2nd "locator" element
 * I type "value" on the "locator" field
 * I append "value" on the "my-app" page's 2nd "locator" element
 * I append "value" on the "my-app" page's "locator" field
 * I append "value" on the 2nd "locator" element
 * I append "value" on the "locator" field
 */
When(
  "I {type_or_append} {input_string} on the {page_object_locator} element/field",
  async function(this: This, action: SetValueAction, value: string, locator: Locator) {
    await whenTypeOnField(locator, value, action);
  }
);

/**
 * Samples:
 * I type a multi line value on the "my-app" page's 2nd "locator" element:
 * I type a multi line value on the "my-app" page's "locator" field:
 * I type a multi line value on the 2nd "locator" element:
 * I type a multi line value on the "locator" field:
 * I append a multi line value on the "my-app" page's 2nd "locator" element:
 * I append a multi line value on the "my-app" page's "locator" field:
 * I append a multi line value on the 2nd "locator" element:
 * I append a multi line value on the "locator" field:
 */
When(
  "I {type_or_append} a multi line value on the {page_object_locator} element:/field:",
  async function(this: This, action: SetValueAction, locator: Locator, value: string) {
    await whenTypeOnField(locator, value, action);
  }
);

/**
 * Samples:
 * I type on the fields:
 * I append on the fields:
 */
When(
  "I {type_or_append} on the fields:",
  async function(this: This, action: SetValueAction, table: DataTable) {
    const values = table.raw()
      .slice(1)
      .map(([element, value, index]) => ({ locator: this.findPageObjectLocator(undefined, element, +index), value }));
    for (let i = 0; i < values.length; i++) {
      const { locator, value } = values[i];
      await whenTypeOnField(locator, value, action);
    }
  }
);

/**
 * Samples:
 * I type on the "my-app" page's fields:
 * I append on the "my-app" page's fields:
 */
When(
  "I {type_or_append} on the {input_string} page's fields:",
  async function(this: This, action: SetValueAction, table: DataTable) {
    const values = table.raw().slice(1).map(([element, value, index]) => ({ locator: this.findPageObjectLocator(undefined, element, +index), value }));
    for (let i = 0; i < values.length; i++) {
      const { locator, value } = values[i];
      await whenTypeOnField(locator, value, action);
    }
  }
);


async function whenToggleOption(action: ToggleAction, locator: Locator) {
  action === ToggleAction.TICK ? await locator.check({ force: true }) : await locator.uncheck({ force: true });
}

/**
 * Samples:
 * I tick the "my-app" page's 2nd "locator" element
 * I tick the "my-app" page's "locator" option
 * I tick the 2nd "locator" element
 * I tick the "locator" element
 * I untick the "my-app" page's 2nd "locator" element
 * I untick the "my-app" page's "locator" option
 * I untick the 2nd "locator" element
 * I untick the "locator" element
 */
When(
  "I {tick_or_untick} the {page_object_locator} element/option",
  async function(this: This, action: ToggleAction, locator: Locator) {
    await whenToggleOption(action, locator);
  }
);

/**
 * Samples:
 * I tick the "my-app" page's 2nd "locator" check box
 * I tick the "my-app" page's "locator" check box
 * I tick the 2nd "locator" check box
 * I tick the "locator" check box
 * I untick the "my-app" page's 2nd "locator" check box
 * I untick the "my-app" page's "locator" check box
 * I untick the 2nd "locator" check box
 * I untick the "locator" check box
 */
When(
  "I {tick_or_untick} the {page_object_locator} check box",
  async function(this: This, action: ToggleAction, locator: Locator) {
    await whenToggleOption(action, locator);
  }
);

/**
 * Samples:
 * I tick the "my-app" page's 2nd "locator" toggle item
 * I tick the "my-app" page's "locator" toggle item
 * I tick the 2nd "locator" toggle item
 * I tick the "locator" toggle item
 * I untick the "my-app" page's 2nd "locator" toggle item
 * I untick the "my-app" page's "locator" toggle item
 * I untick the 2nd "locator" toggle item
 * I untick the "locator" toggle item
 */
When(
  "I {tick_or_untick} the {page_object_locator} toggle item",
  async function(this: This, action: ToggleAction, locator: Locator) {
    await whenToggleOption(action, locator);
  }
);

/**
 * Samples:
 * I tick the "my-app" page's 2nd "locator" radio button
 * I tick the "my-app" page's "locator" radio button
 * I tick the 2nd "locator" radio button
 * I tick the "locator" radio button
 * I untick the "my-app" page's 2nd "locator" radio button
 * I untick the "my-app" page's "locator" radio button
 * I untick the 2nd "locator" radio button
 * I untick the "locator" radio button
 */
When(
  "I {tick_or_untick} the {page_object_locator} radio button",
  async function(this: This, action: ToggleAction, locator: Locator) {
    await whenToggleOption(action, locator);
  }
);

/**
 * Samples:
 * I select the option with label "label" from the "my-app" page's 2nd "locator" dropdown
 * I select the option with label "label" from the "my-app" page's "locator" dropdown
 * I select the option with label "label" from the 2nd "locator" dropdown
 * I select the option with label "label" from the "locator" dropdown
 * I select the option with value "value" from the "my-app" page's 2nd "locator" dropdown
 * I select the option with value "value" from the "my-app" page's "locator" dropdown
 * I select the option with value "value" from the 2nd "locator" dropdown
 * I select the option with value "value" from the "locator" dropdown
 */
When(
  "I select the option with {label_or_value} {input_string} from the {page_object_locator} dropdown",
  async function(this: This, context: SelectOptionContext, option: string, locator: Locator) {
    switch (context) {
      case SelectOptionContext.LABEL: {
        await locator.selectOption({ label: option }, { force: true });
        break;
      }
      default: {
        await locator.selectOption({ value: option }, { force: true });
        break;
      }
    }
  }
);

/**
 * Samples:
 * I select 1st option from the "my-app" page's 2nd "locator" dropdown
 * I select 2nd option from the "my-app" page's "locator" dropdown
 * I select 3rd option from the 2nd "locator" dropdown
 * I select 4th option from the "locator" dropdown
 */
When(
  "I select the {ordinal} option from the {page_object_locator} dropdown",
  async function(this: This, ordinal: number, locator: Locator) {
    await locator.selectOption({ index: ordinal - 1 }, { force: true });
  }
);

/**
 * Samples:
 * I select the options from the "my-app" page's 2nd "locator" multi select dropdown:
 * I select the options from the "my-app" page's "locator" multi select dropdown:
 * I select the options from the 2nd "locator" multi select dropdown:
 * I select the options from the "locator" multi select dropdown:
 */
When(
  "I select the options from the {page_object_locator} multi select dropdown:",
  async function(this: This, locator: Locator, table: DataTable) {
    const values = table.raw().slice(1).map(([context, value]) => ({ [context]: context === "index" ? +value : value }));
    await locator.selectOption(values, { force: true });
  }
);

/**
 * Samples:
 * I upload the "filepath" file to the "my-app" page's 2nd "locator" element
 * I upload the "filepath" file to the "my-app" page's "locator" field
 * I upload the "filepath" file to the 2nd "locator" element
 * I upload the "filepath" file to the "locator" field
 */
When(
  "I upload the {input_string} file to the {page_object_locator} element/field",
  async function(this: This, filepath: string, locator: Locator) {
    await locator.uploadFiles(filepath);
  }
);
