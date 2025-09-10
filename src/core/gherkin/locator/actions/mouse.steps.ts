import { When } from "@cucumber/cucumber";
import { ClickAction } from "@core/gherkin/enums";

import type { World as This } from "@core/world";
import type { Locator } from "playwright";

import * as fn from "./mouse.glue";

/**
 * Samples:
 * I click the "my-app" page's 2nd "locator" element
 * I double click the "my-app" page's "locator" field
 * I force click the "locator" button
 * I middle click the 2nd "locator" button 2 times
 * I right click the "locator" element again
 */
When(
  "I {click} the {page_object_locator} element/field/button{repeats}",
  async function(this: This, action: ClickAction, locator: Locator, clickCount: number) {
    await fn.click(locator, action, clickCount);
  }
);

/**
 * Samples:
 * I click the 2nd "label" link
 * I double click the "label" link 2 times
 * I force click the "label" link 2 times again
 * I middle click the 2nd "label" link again
 * I right click the "label" link
 */
When(
  "I {click} the {link_locator} link{repeats}",
  async function(this: This, action: ClickAction, locator: Locator, clickCount: number) {
    await fn.click(locator, action, clickCount);
  }
);

/**
 * Samples:
 * I drag the "my-app" page's 2nd "locator" element to the "other-app" page's 2nd "locator" element
 * I drag the "my-app" page's "locator" element to the "other-app" page's "locator" element
 * I drag the 2nd "locator" element to the "locator" element
 */
When(
  "I drag the {page_object_locator} element to the {page_object_locator} element",
  async function(this: This, source: Locator, target: Locator) {
    await fn.dragAndDrop(source, target);
  }
);

/**
 * Samples:
 * I focus on the "my-app" page's 2nd "locator" element
 * I focus on the "my-app" page's "locator" field
 * I focus on the 2nd "locator" button
 * I focus on the "locator" component
 */
When(
  "I focus on the {page_object_locator} element/field/button/component",
  async function(this: This, locator: Locator) {
    await fn.focus(locator);
  }
);

/**
 * Samples:
 * I hover on the "my-app" page's 2nd "locator" element
 * I hover on the "my-app" page's "locator" field
 * I hover on the 2nd "locator" button
 * I hover on the "locator" component
 */
When(
  "I hover on the {page_object_locator} element/field/button/component",
  async function(this: This, locator: Locator) {
    await fn.hoverIntoView(locator);
  }
);

/**
 * Samples:
 * I hover on the "my-app" page's 2nd "locator" element with an offset of 11,21
 * I hover on the "my-app" page's "locator" field with an offset of 11,21
 * I hover on the 2nd "locator" button with an offset of 11,21
 * I hover on the "locator" component with an offset of 11,21
 */
When(
  "I hover on the {page_object_locator} element/field/button/component with an offset of {int},{int}",
  async function(this: This, locator: Locator, x: number, y: number) {
    await fn.hoverIntoView(locator, { position: { x, y } });
  }
);

/**
 * Samples:
 * I scroll to the "my-app" page's 2nd "locator" element
 * I scroll to the "my-app" page's "locator" field
 * I scroll to the 2nd "locator" button
 * I scroll to the "locator" component
 */
When(
  "I scroll to the {page_object_locator} element/field/button/component",
  async function(this: This, locator: Locator) {
    await locator.scrollIntoView();
  }
);
