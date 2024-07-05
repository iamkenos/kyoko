import { When } from "@cucumber/cucumber";
import { ClickAction } from "../../enums";

import type { Locator } from "@commands/locator/types";
import type { Component } from "../../../component";
import type { World as This } from "../../../world";

export async function whenClickElement(action: ClickAction, locator: Locator | Component, clickCount: number) {
  switch (action) {
    case ClickAction.FORCE: {
      await locator.click({ clickCount, force: true });
      break;
    }
    case ClickAction.DOUBLE: {
      await locator.dblclick();
      break;
    }
    case ClickAction.MIDDLE: {
      await locator.click({ button: ClickAction.MIDDLE, clickCount });
      break;
    }
    case ClickAction.RIGHT: {
      await locator.click({ button: ClickAction.RIGHT, clickCount });
      break;
    }
    default: {
      await locator.click({ clickCount });
      break;
    }
  }
}

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
    await whenClickElement(action, locator, clickCount);
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
    await whenClickElement(action, locator, clickCount);
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
    await source.dragAndDrop(target);
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
    await locator.focus();
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
    await locator.hoverIntoView();
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
    await locator.hoverIntoView({ position: { x, y } });
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
