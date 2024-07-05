import { When } from "@cucumber/cucumber";

import type { Locator } from "@commands/locator/types";
import type { World as This } from "../../../world";

/**
 * Samples:
 * I search for locators under the "my-app" page's 1st "locator" section
 * I search for elements under the "my-app" page's "locator" component
 * I search for fields under the "locator" element
 */
When(
  "I search for locators/elements/fields/buttons/components under the {page_object_locator} section/component/element/form",
  async function(this: This, locator: Locator) {
    this.context.locatorSearchLimit = locator;
  }
);

/**
 * Samples:
 * I remove the locator search limit
 * I remove the element search restriction
 * I remove the field search limit
 * I remove the component search restriction
 */
When(
  "I remove the locator/element/field/component search limit/restriction",
  async function(this: This) {
    this.context.locatorSearchLimit = undefined;
  }
);
