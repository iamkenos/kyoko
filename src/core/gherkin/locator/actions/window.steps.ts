import { When } from "@cucumber/cucumber";

import type { Context as This } from "@core/world";
import type { Locator } from "playwright";

import * as fn from "./window.glue";

/**
 * Samples:
 * I search for locators under the "my-app" page's 1st "locator's" "sublocator" section
 * I search for elements under the "my-app" page's "locator's" "sublocator" component
 * I search for fields under the 2nd "locator's" "sublocator" element
 * I search for buttons under the "locator's" "sublocator" form
 * I search for components under the "locator" element
 */
When(
  "I search for locators/elements/fields/buttons/components under the {page_object_locator_nested}",
  async function(this: This, locator: Locator) {
    fn.setLocatorSearchRestriction(this, locator);
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
    fn.unsetLocatorSearchRestriction(this);
  }
);
