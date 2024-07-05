import { DataTable, Then } from "@cucumber/cucumber";
import {
  Axis,
  MatchContext,
  SizeContext
} from "../../enums";

import type { Locator } from "@commands/locator/types";
import type { World as This } from "../../../world";

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" elements text array to be:
 * I expect the "my-app" page's "locator" elements text array to contain:
 * I expect the 2nd "locator" elements text array to be:
 * I expect the "locator" elements text array to contain:
 * I expect the "my-app" page's 2nd "locator" elements text array to not be:
 * I expect the "my-app" page's "locator" elements text array to not contain:
 * I expect the 2nd "locator" elements text array to not be:
 * I expect the "locator" elements text array to not contain:
 */
Then(
  "I expect the {page_object_locator} elements text array {to_or_to_not} {be_or_contain}:",
  async function(this: This, locator: Locator, not: boolean, context: MatchContext, values: DataTable) {
    const actual = await locator.allTextContents();
    const expected = [].concat(...values.rows());

    switch (context) {
      case MatchContext.BE:
      case MatchContext.MATCH: {
        await locator.page().expect().arrayEquals(actual, expected, !not).poll();
        break;
      }
      default: {
        await locator.page().expect().arrayContains(actual, expected, !not).poll();
        break;
      }
    }
  }
);

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element "attribute" attribute to be "value"
 * I expect the "my-app" page's "locator" field "attribute" attribute to contain "value"
 * I expect the 2nd "locator" button "attribute" attribute to be "value"
 * I expect the "locator" component "attribute" attribute to contain "value"
 * I expect the "my-app" page's 2nd "locator" element "attribute" attribute to not be "value"
 * I expect the "my-app" page's "locator" field "attribute" attribute to not contain "value"
 * I expect the 2nd "locator" button "attribute" attribute to not be "value"
 * I expect the "locator" component "attribute" attribute to not contain "value"
 */
Then(
  "I expect the {page_object_locator} element/field/button/component {input_string} attribute {to_or_to_not} {be_or_contain} {input_string}",
  async function(this: This, locator: Locator, attribute: string, not: boolean, context: MatchContext, expected: string) {
    switch (context) {
      case MatchContext.BE:
      case MatchContext.MATCH: {
        await locator.expect().attributeEquals(attribute, expected, !not).poll();
        break;
      }
      default: {
        await locator.expect().attributeContains(attribute, expected, !not).poll();
        break;
      }
    }
  }
);

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element "attribute" to exist
 * I expect the "my-app" page's "locator" field "attribute" to exist
 * I expect the 2nd "locator" button "attribute" to exist
 * I expect the "locator" component "attribute" to exist
 * I expect the "my-app" page's 2nd "locator" element "attribute" to not exist
 * I expect the "my-app" page's "locator" field "attribute" to not exist
 * I expect the 2nd "locator" button "attribute" to not exist
 * I expect the "locator" component "attribute" to not exist
 */
Then(
  "I expect the {page_object_locator} element/field/button/component {input_string} attribute {to_or_to_not} exist",
  async function(this: This, locator: Locator, expected: string, not: boolean) {
    await locator.expect().attributeExists(expected, !not).poll();
  }
);

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element location at x axis to be 11.21
 * I expect the "my-app" page's "locator" field location at y axis to be 11.21
 * I expect the 2nd "locator" button location at x axis to be 11.21
 * I expect the "locator" component location at y axis to be 11.21
 * I expect the "my-app" page's 2nd "locator" element location at x axis to not be 11.21
 * I expect the "my-app" page's "locator" field location at y axis to not be 11.21
 * I expect the 2nd "locator" button location at x axis to not be 11.21
 * I expect the "locator" component location at y axis to not be 11.21
 */
Then(
  "I expect the {page_object_locator} element/field/button/component location at {x_or_y} axis {to_or_to_not} be {float}",
  async function(this: This, locator: Locator, axis: Axis, not: boolean, expected: number) {
    await locator.expect().axisLocationEquals(axis, expected, !not).poll();
  }
);

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element count to be 21
 * I expect the "my-app" page's "locator" field count to be 21
 * I expect the 2nd "locator" button count to be 21
 * I expect the "locator" component count to be 21
 * I expect the "my-app" page's 2nd "locator" element count to not be 21
 * I expect the "my-app" page's "locator" field count to not be 21
 * I expect the 2nd "locator" button count to not be 21
 * I expect the "locator" component count to not be 21
 */
Then(
  "I expect the {page_object_locator} element/field/button/component count {to_or_to_not} be {int}",
  async function(this: This, locator: Locator, not: boolean, expected: number) {
    await locator.expect().countEquals(expected, !not).poll();
  }
);

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element count to be less than 21
 * I expect the "my-app" page's "locator" field count to be less than 21
 * I expect the 2nd "locator" button count to be less than 21
 * I expect the "locator" component count to be less than 21
 * I expect the "my-app" page's 2nd "locator" element count to not be less than 21
 * I expect the "my-app" page's "locator" field count to not be less than 21
 * I expect the 2nd "locator" button count to not be less than 21
 * I expect the "locator" component count to not be less than 21
 */
Then(
  "I expect the {page_object_locator} element/field/button/component count {to_or_to_not} be less than {int}",
  async function(this: This, locator: Locator, not: boolean, expected: number) {
    await locator.expect().countLessThan(expected, !not).poll();
  }
);

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element count to be more than 21
 * I expect the "my-app" page's "locator" field count to be greater than 21
 * I expect the 2nd "locator" button count to be more than 21
 * I expect the "locator" component count to be greater than 21
 * I expect the "my-app" page's 2nd "locator" element count to not be more than 21
 * I expect the "my-app" page's "locator" field count to not be greater than 21
 * I expect the 2nd "locator" button count to not be more than 21
 * I expect the "locator" component count to not be greater than 21
 */
Then(
  "I expect the {page_object_locator} element/field/button/component count {to_or_to_not} be more/greater than {int}",
  async function(this: This, locator: Locator, not: boolean, expected: number) {
    await locator.expect().countMoreThan(expected, !not).poll();
  }
);

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element "property" css property to exist
 * I expect the "my-app" page's "locator" field "property" css property to exist
 * I expect the 2nd "locator" button "property" css property to exist
 * I expect the "locator" component "property" css property to exist
 * I expect the "my-app" page's 2nd "locator" element "property" css property to not exist
 * I expect the "my-app" page's "locator" field "property" css property to not exist
 * I expect the 2nd "locator" button "property" css property to not exist
 * I expect the "locator" component "property" css property to not exist
 */
Then(
  "I expect the {page_object_locator} element/field/button/component {input_string} css property {to_or_to_not} exist",
  async function(this: This, locator: Locator, expected: string, not: boolean) {
    await locator.expect().cssPropertyExists(expected, !not).poll();
  }
);

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element to be 11.21px in width and 21.11 in height
 * I expect the "my-app" page's "locator" field to be 11.21px in width and 21.11 in height
 * I expect the 2nd "locator" button to be 11.21px in width and 21.11 in height
 * I expect the "locator" component to be 11.21px in width and 21.11 in height
 * I expect the "my-app" page's 2nd "locator" element to not be 11.21px in width and 21.11 in height
 * I expect the "my-app" page's "locator" field to not be 11.21px in width and 21.11 in height
 * I expect the 2nd "locator" button to not be 11.21px in width and 21.11 in height
 * I expect the "locator" component to not be 11.21px in width and 21.11 in height
 */
Then(
  "I expect the {page_object_locator} element/field/button/component {to_or_to_not} be {float}px in width and {float}px in height",
  async function(this: This, locator: Locator, not: boolean, width: number, height: number) {
    await locator.expect().dimensionEquals(width, height, !not).poll();
  }
);

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element to be 11.21px in width
 * I expect the "my-app" page's "locator" field to be 11.21px in height
 * I expect the 2nd "locator" button to be 11.21px in width
 * I expect the "locator" component to be 11.21px in height
 * I expect the "my-app" page's 2nd "locator" element to not be 11.21px in width
 * I expect the "my-app" page's "locator" field to not be 11.21px in height
 * I expect the 2nd "locator" button to not be 11.21px in width
 * I expect the "locator" component to not be 11.21px in height
 */
Then(
  "I expect the {page_object_locator} element/field/button/component {to_or_to_not} be {float}px in {width_or_height}",
  async function(this: This, locator: Locator, not: boolean, expected: number, side: SizeContext) {
    await locator.expect().dimensionSideEquals(side, expected, !not).poll();
  }
);

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element to be displayed
 * I expect the "my-app" page's "locator" field to be displayed
 * I expect the 2nd "locator" button to be displayed
 * I expect the "locator" component to be displayed
 * I expect the "my-app" page's 2nd "locator" element to not be displayed
 * I expect the "my-app" page's "locator" field to not be displayed
 * I expect the 2nd "locator" button to not be displayed
 * I expect the "locator" component to not be displayed
 */
Then(
  "I expect the {page_object_locator} element/field/button/component {to_or_to_not} be displayed",
  async function(this: This, locator: Locator, not: boolean) {
    await locator.expect().displayed(!not).poll();
  }
);

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element to be displayed within the viewport
 * I expect the "my-app" page's "locator" field to be displayed within the viewport
 * I expect the 2nd "locator" button to be displayed within the viewport
 * I expect the "locator" component to be displayed within the viewport
 * I expect the "my-app" page's 2nd "locator" element to not be displayed within the viewport
 * I expect the "my-app" page's "locator" field to not be displayed within the viewport
 * I expect the 2nd "locator" button to not be displayed within the viewport
 * I expect the "locator" component to not be displayed within the viewport
 */
Then(
  "I expect the {page_object_locator} element/field/button/component {to_or_to_not} be displayed within the viewport",
  async function(this: This, locator: Locator, not: boolean) {
    await locator.expect().displayedInViewport(!not).poll();
  }
);

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element to be enabled
 * I expect the "my-app" page's "locator" field to be enabled
 * I expect the 2nd "locator" button to be enabled
 * I expect the "locator" component to be enabled
 * I expect the "my-app" page's 2nd "locator" element to not be enabled
 * I expect the "my-app" page's "locator" field to not be enabled
 * I expect the 2nd "locator" button to not be enabled
 * I expect the "locator" component to not be enabled
 */
Then(
  "I expect the {page_object_locator} element/field/button/component {to_or_to_not} be enabled",
  async function(this: This, locator: Locator, not: boolean) {
    await locator.expect().enabled(!not).poll();
  }
);

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element to exist
 * I expect the "my-app" page's "locator" field to exist
 * I expect the 2nd "locator" button to exist
 * I expect the "locator" component to exist
 * I expect the "my-app" page's 2nd "locator" element to not exist
 * I expect the "my-app" page's "locator" field to not exist
 * I expect the 2nd "locator" button to not exist
 * I expect the "locator" component to not exist
 */
Then(
  "I expect the {page_object_locator} element/field/button/component {to_or_to_not} exist",
  async function(this: This, locator: Locator, not: boolean) {
    await locator.expect().exists(!not).poll();
  }
);

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element to be focused
 * I expect the "my-app" page's "locator" field to be focused
 * I expect the 2nd "locator" button to be focused
 * I expect the "locator" component to be focused
 * I expect the "my-app" page's 2nd "locator" element to not be focused
 * I expect the "my-app" page's "locator" field to not be focused
 * I expect the 2nd "locator" button to not be focused
 * I expect the "locator" component to not be focused
 */
Then(
  "I expect the {page_object_locator} element/field/button/component {to_or_to_not} be focused",
  async function(this: This, locator: Locator, not: boolean) {
    await locator.expect().focused(!not).poll();
  }
);

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element to match the snapshot "file/path"
 * I expect the "my-app" page's "locator" field to match the snapshot "file/path"
 * I expect the 2nd "locator" button to match the snapshot "file/path"
 * I expect the "locator" component to match the snapshot "file/path"
 * I expect the "my-app" page's 2nd "locator" element to not match the snapshot "file/path"
 * I expect the "my-app" page's "locator" field to not match the snapshot "file/path"
 * I expect the 2nd "locator" button to not match the snapshot "file/path"
 * I expect the "locator" component to not match the snapshot "file/path"
 */
Then(
  "I expect the {page_object_locator} element/field/button/component {to_or_to_not} match the snapshot {input_string}",
  async function(this: This, locator: Locator, not: boolean, filename: string) {
    await locator.expect().snapshotMatch(filename, undefined, !not).poll();
  }
);

async function thenTextMatch(locator: Locator, not: boolean, context: MatchContext, expected: string) {
  switch (context) {
    case MatchContext.BE:
    case MatchContext.MATCH: {
      await locator.expect().textEquals(expected, !not).poll();
      break;
    }
    default: {
      await locator.expect().textContains(expected, !not).poll();
      break;
    }
  }
}

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element text to be "value"
 * I expect the "my-app" page's "locator" field text to contain "value"
 * I expect the 2nd "locator" button text to match "value"
 * I expect the "locator" component text to partially match "value"
 * I expect the "my-app" page's 2nd "locator" element text to not be "value"
 * I expect the "my-app" page's "locator" field text to not contain "value"
 * I expect the 2nd "locator" button text to not match "value"
 * I expect the "locator" component text to not partially match "value"
 */
Then(
  "I expect the {page_object_locator} element/field/button/component text {to_or_to_not} {be_or_contain} {input_string}",
  async function(this: This, locator: Locator, not: boolean, context: MatchContext, expected: string) {
    await thenTextMatch(locator, not, context, expected);
  }
);

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element text to be:
 * I expect the "my-app" page's "locator" field text to contain:
 * I expect the 2nd "locator" button text to match:
 * I expect the "locator" component text to partially match:
 * I expect the "my-app" page's 2nd "locator" element text to not be:
 * I expect the "my-app" page's "locator" field text to not contain:
 * I expect the 2nd "locator" button text to not match:
 * I expect the "locator" component text to not partially match:
 */
Then(
  "I expect the {page_object_locator} element/field/button/component text {to_or_to_not} {be_or_contain}:",
  async function(this: This, locator: Locator, not: boolean, context: MatchContext, expected: string) {
    await thenTextMatch(locator, not, context, expected);
  }
);

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element text to be empty
 * I expect the "my-app" page's "locator" field text to be empty
 * I expect the 2nd "locator" button text to be empty
 * I expect the "locator" component text to be empty
 * I expect the "my-app" page's 2nd "locator" element text to not be empty
 * I expect the "my-app" page's "locator" field text to not be empty
 * I expect the 2nd "locator" button text to not be empty
 * I expect the "locator" component text to not be empty
 */
Then(
  "I expect the {page_object_locator} element/field/button/component text {to_or_to_not} be empty",
  async function(this: This, locator: Locator, not: boolean) {
    await locator.expect().textEmpty(!not).poll();
  }
);
