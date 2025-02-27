import { Then } from "@cucumber/cucumber";
import { Count, MatchContext } from "@core/gherkin/enums";

import type { PageObject } from "@core/page-object";
import type { World as This } from "@core/world";

import * as fn from "./window.glue";

/**
 * Samples:
 * I expect to be on the "my-app" page
 * I expect to be on the "my-app" site
 * I expect to be on the "my-app" portal
 * I expect to not be on the "my-app" portal
 */
Then(
  "I expect {to_or_to_not} be on the {page_object} page/site/portal",
  async function(this: This, not: boolean, page: PageObject) {
    await fn.expectPageHasFullyLoaded(page, { not });
  }
);

/**
 * Samples:
 * I expect to still be on the "my-app" page
 * I expect to still be on the "my-app" site
 * I expect to still be on the "my-app" portal
 */
Then(
  "I expect to still be on the {page_object} page/site/portal",
  async function(this: This, page: PageObject) {
    await fn.expectPageHasFullyLoaded(page);
  }
);

/**
 * Samples:
 * I expect to be back to the "my-app" page
 * I expect to be back to the "my-app" site
 * I expect to be back to the "my-app" portal
 * I expect to not be back to the "my-app" portal
 */
Then(
  "I expect {to_or_to_not} be back to the {page_object} page/site/portal",
  async function(this: This, not: boolean, page: PageObject) {
    await fn.expectPageHasFullyLoaded(page, { not });
  }
);

/**
 * Samples:
 * I expect the page to match the snapshot "path/to/snapshot"
 * I expect the viewport to not match the snapshot "path/to/snapshot"
 */
Then(
  "I expect the {page_or_viewport} {to_or_to_not} match the snapshot {input_string}",
  async function(this: This, context: string, not: boolean, filename: string) {
    await fn.expectPageSnapshotMatches(this.page, filename, { not, fullPage: context.length === 4 });
  }
);

/**
 * Samples:
 * I expect the page title to contain the "my-app" page's title
 * I expect the page title to contain "title"
 * I expect the page title to not contain the "my-app" page's title
 * I expect the page title to not contain "title"
 * I expect the page title to match the "my-app" page's title
 * I expect the page title to be "title"
 * I expect the page title to not match the "my-app" page's title
 * I expect the page title to not be "title"
 */
Then(
  "I expect the page title {to_or_to_not} {be_or_contain} {the_page_object_title}",
  async function(this: This, not: boolean, context: MatchContext, title: string) {
    await fn.expectPageTitleMatches(this.page, title, context, { not });
  }
);

/**
 * Samples:
 * I expect the page url to contain the "my-app" page's url
 * I expect the page url to contain "url"
 * I expect the page url to not contain the "my-app" page's url
 * I expect the page url to not contain "url"
 */
Then(
  "I expect the url {to_or_to_not} contain {the_page_object_url}",
  async function(this: This, not: boolean, url: string) {
    await fn.expectPageUrlMatches(this.page, url, MatchContext.CONTAIN, { not });
  }
);

/**
 * Samples:
 * I expect the page url to match the "my-app" page's url
 * I expect the page url to be "url"
 * I expect the page url to not match the "my-app" page's url
 * I expect the page url to not be "url"
 */
Then(
  "I expect the url {to_or_to_not} be/match {the_page_object_url}",
  async function(this: This, not: boolean, url: string) {
    await fn.expectPageUrlMatches(this.page, url, MatchContext.BE, { not });
  }
);

/**
 * Samples:
 * I expect the window count to be 1
 * I expect the tab count to not be 1
 */
Then(
  "I expect the window/tab count {to_or_to_not} be {int}",
  async function(this: This, not: boolean, value: number) {
    await fn.expectWindowCountMatches(this.page, value, Count.EQUAL, { not });
  }
);

/**
 * Samples:
 * I expect the window count to be more than 1
 * I expect the tab count to be less than 1
 * I expect the window count to not be less than 1
 * I expect the tab count to not be less than 1
 */
Then(
  "I expect the window/tab count {to_or_to_not} be {less_or_more} than {int}",
  async function(this: This, not: boolean, count: Count, value: number) {
    await fn.expectWindowCountMatches(this.page, value, count, { not });
  }
);

