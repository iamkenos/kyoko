import { Then } from "@cucumber/cucumber";
import {
  HrefSchemeContext,
  HrefTargetContext
} from "@core/gherkin/enums";

import type { WebPage } from "@core/fixtures/web-page.fixture";
import type { World as This } from "@core/world";
import type { Locator } from "playwright";

import * as fn from "./link.glue";

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element to open on a new window
 * I expect the "my-app" page's "locator" button to open on the same frame
 * I expect the 2nd "locator" element to open on the parent window
 * I expect the "locator" button to open on the top frame
 * I expect the "my-app" page's 2nd "locator" element to not open on a new window
 * I expect the "my-app" page's "locator" button to not open on the same frame
 * I expect the 2nd "locator" element to not open on the parent window
 * I expect the "locator" button to not open on the top frame
 */
Then(
  "I expect the {page_object_locator} element/button {to_or_to_not} open on a/the {link_target}",
  async function(this: This, locator: Locator, not: boolean, expected: HrefTargetContext) {
    await fn.expectLinkOpensOn(locator, expected, { not });
  }
);

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element to open without a target
 * I expect the "my-app" page's "locator" button to open without a target
 * I expect the 2nd "locator" element to open without a target
 * I expect the "locator" button to open without a target
 * I expect the "my-app" page's 2nd "locator" element to not open without a target
 * I expect the "my-app" page's "locator" button to not open without a target
 * I expect the 2nd "locator" element to not open without a target
 * I expect the "locator" button to not open without a target
 */
Then(
  "I expect the {page_object_locator} element/button {to_or_to_not} open without a target",
  async function(this: This, locator: Locator, not: boolean) {
    await fn.expectLinkOpensOnTheSameWindow(locator, { not });
  }
);

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element to open on a named frame "frame"
 * I expect the "my-app" page's "locator" button to open on a named frame "frame"
 * I expect the 2nd "locator" element to open on a named frame "frame"
 * I expect the "locator" button to open on a named frame "frame"
 * I expect the "my-app" page's 2nd "locator" element to not open on a named frame "frame"
 * I expect the "my-app" page's "locator" button to not open on a named frame "frame"
 * I expect the 2nd "locator" element to not open on a named frame "frame"
 * I expect the "locator" button to not open on a named frame "frame"
 */
Then(
  "I expect the {page_object_locator} element/button {to_or_to_not} open on a/the named frame {input_string}",
  async function(this: This, locator: Locator, not: boolean, expected: string) {
    await fn.expectLinkOpensOnTheNamedFrame(locator, expected, { not });
  }
);

/**
 * Samples:
 * I expect the 2nd "link text" link to open on a new window
 * I expect the "link text" link to open on the same frame
 * I expect the 3rd "link text" link to open on the parent window
 * I expect the "link text" link to open on the top frame
 * I expect the 2nd "link text" link to not open on a new window
 * I expect the "link text" link to not open on the same frame
 * I expect the 3rd "link text" link to not open on the parent window
 * I expect the "link text" link to not open on the top frame
 */
Then(
  "I expect the {link_locator} link {to_or_to_not} open on a/the {link_target}",
  async function(this: This, locator: Locator, not: boolean, expected: HrefTargetContext) {
    await fn.expectLinkOpensOn(locator, expected, { not });
  }
);

/**
 * Samples:
 * I expect the 2nd "link text" link to open without a target
 * I expect the "link text" link to open without a target
 * I expect the 2nd "link text" link to not open without a target
 * I expect the "link text" link to not open without a target
 */
Then(
  "I expect the {link_locator} link {to_or_to_not} open without a target",
  async function(this: This, locator: Locator, not: boolean) {
    await fn.expectLinkOpensOnTheSameWindow(locator, { not });
  }
);

/**
 * Samples:
 * I expect the 2nd "link text" link to open on a named frame "frame"
 * I expect the "link text" link to open on a named frame "frame"
 * I expect the 2nd "link text" link to not open on a named frame "frame"
 * I expect the "link text" link to not open on a named frame "frame"
 */
Then(
  "I expect the {link_locator} link {to_or_to_not} open on a/the named frame {input_string}",
  async function(this: This, locator: Locator, not: boolean, expected: string) {
    await fn.expectLinkOpensOnTheNamedFrame(locator, expected, { not });
  }
);

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element to point to a mail scheme "mail@email.com"
 * I expect the "my-app" page's "locator" button to point to a tel scheme "+4733378901"
 * I expect the 2nd "locator" element to point to a mail scheme "mail@email.com"
 * I expect the "locator" button to point to a tel scheme "mail@email.com"
 * I expect the "my-app" page's 2nd "locator" element to not point to a mail scheme "mail@email.com"
 * I expect the "my-app" page's "locator" button to not point to a tel scheme "+4733378901"
 * I expect the 2nd "locator" element to not point to a mail scheme "mail@email.com"
 * I expect the "locator" button to not point to a tel scheme "mail@email.com"
 */
Then(
  "I expect the {page_object_locator} element/button {to_or_to_not} point to a {link_scheme} scheme {input_string}",
  async function(this: This, locator: Locator, not: boolean, scheme: HrefSchemeContext, expected: string) {
    await fn.expectLinkSchemeEquals(locator, expected, scheme, { not });
  }
);

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element to point to a path "/url/path"
 * I expect the "my-app" page's "locator" button to point to a section "#heading-1"
 * I expect the 2nd "locator" element to point to a path "/url/path"
 * I expect the "locator" button to point to a section "#heading-1"
 * I expect the "my-app" page's 2nd "locator" element to not point to a path "/url/path"
 * I expect the "my-app" page's "locator" button to not point to a section "#heading-1"
 * I expect the 2nd "locator" element to not point to a path "/url/path"
 * I expect the "locator" button to not point to a section "#heading-1"
 */
Then(
  "I expect the {page_object_locator} element/button {to_or_to_not} point to a path/section {input_string}",
  async function(this: This, locator: Locator, not: boolean, expected: string) {
    await fn.expectLinkHrefEquals(locator, expected, { not });
  }
);

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element to point to "javascript:alert()"
 * I expect the "my-app" page's "locator" button to point to an absolute url "https://www.url.com"
 * I expect the 2nd "locator" element to point to "javascript:alert()"
 * I expect the "locator" button to point to an absolute url "https://www.url.com"
 * I expect the "my-app" page's 2nd "locator" element to not point to "javascript:alert()"
 * I expect the "my-app" page's "locator" button to not point to an absolute url "https://www.url.com"
 * I expect the 2nd "locator" element to not point to "javascript:alert()"
 * I expect the "locator" button to not point to an absolute url "https://www.url.com"
 */
Then(
  "I expect the {page_object_locator} element/button {to_or_to_not} point to( an absolute url) {input_string}",
  async function(this: This, locator: Locator, not: boolean, expected: string) {
    await fn.expectLinkHrefEquals(locator, expected, { not });
  }
);

/**
 * Samples:
 * I expect the 2nd "link text" link to point to a mail scheme "mail@email.com"
 * I expect the "link text" link to point to a tel scheme "+4733378901"
 * I expect the 2nd "link text" link to not point to a mail scheme "mail@email.com"
 * I expect the "link text" link to not point to a tel scheme "+4733378901"
 */
Then(
  "I expect the {link_locator} link {to_or_to_not} point to a {link_scheme} scheme {input_string}",
  async function(this: This, locator: Locator, not: boolean, scheme: HrefSchemeContext, expected: string) {
    await fn.expectLinkSchemeEquals(locator, expected, scheme, { not });
  }
);

/**
 * Samples:
 * I expect the 2nd "link text" link to point to a point to a path "/url/path"
 * I expect the "link text" link to point to a section "#heading-1"
 * I expect the 2nd "link text" link to not point to a point to a path "/url/path"
 * I expect the "link text" link to not point to a section "#heading-1"
 */
Then(
  "I expect the {link_locator} link {to_or_to_not} point to a path/section {input_string}",
  async function(this: This, locator: Locator, not: boolean, expected: string) {
    await fn.expectLinkHrefEquals(locator, expected, { not });
  }
);

/**
 * Samples:
 * I expect the 2nd "link text" link to point to "javascript:alert()"
 * I expect the "link text" link to point to an absolute url "https://www.url.com"
 * I expect the 2nd "link text" link to not point to "javascript:alert()"
 * I expect the "link text" link to not point to an absolute url "https://www.url.com"
 */
Then(
  "I expect the {link_locator} link {to_or_to_not} point to( an absolute url) {input_string}",
  async function(this: This, locator: Locator, not: boolean, expected: string) {
    await fn.expectLinkHrefEquals(locator, expected, { not });
  }
);

/**
 * Samples:
 * I expect the "my-app" page's 2nd "locator" element to point to the "other-app" page
 * I expect the "my-app" page's "locator" button to point to the "other-app" page
 * I expect the 2nd "locator" element to point to the "other-app" page
 * I expect the "locator" button to point to the "other-app" page
 * I expect the "my-app" page's 2nd "locator" element to not point to the "other-app" page
 * I expect the "my-app" page's "locator" button to not point to the "other-app" page
 * I expect the 2nd "locator" element to not point to the "other-app" page
 * I expect the "locator" button to not point to the "other-app" page
 */
Then(
  "I expect the {page_object_locator} element/button {to_or_to_not} point to the {page_object} page",
  async function(this: This, locator: Locator, not: boolean, page: WebPage) {
    await fn.expectLinkHrefEquals(locator, page.url, { not });
  }
);

/**
 * Samples:
 * I expect the 2nd "link text" link to point to the "other-app" page
 * I expect the "link text" link to point to the "other-app" page
 * I expect the 2nd "link text" link to not point to the "other-app" page
 * I expect the "link text" link to not point to the "other-app" page
 */
Then(
  "I expect the {link_locator} link {to_or_to_not} point to the {page_object} page",
  async function(this: This, locator: Locator, not: boolean, page: WebPage) {
    await fn.expectLinkHrefEquals(locator, page.url, { not });
  }
);
