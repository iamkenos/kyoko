import { Then } from "@cucumber/cucumber";
import { Count } from "../../enums";

import type { World as This } from "../../../world";
import type { PageObject } from "../../../page-object";

/**
 * Samples:
 * I expect to be on the "my-app" page
 * I expect to be on the "my-app" site
 * I expect to be on the "my-app" portal
 */
Then(
  "I expect to be on the {page_object} page/site/portal",
  async function(this: This, page: PageObject) {
    await page.expect().loaded().poll();
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
    await page.expect().loaded().poll();
  }
);

/**
 * Samples:
 * I expect to be back to the "my-app" page
 * I expect to be back to the "my-app" site
 * I expect to be back to the "my-app" portal
 */
Then(
  "I expect to be back to the {page_object} page/site/portal",
  async function(this: This, page: PageObject) {
    await page.expect().loaded().poll();
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
    await this.page.expect().snapshotMatch(filename, { fullPage: context.length === 4 }, !not).poll();
  }
);

/**
 * Samples:
 * I expect the page title to contain the "my-app" page's title
 * I expect the page title to contain "title"
 * I expect the page title to not contain the "my-app" page's title
 * I expect the page title to not contain "title"
 */
Then(
  "I expect the page title {to_or_to_not} contain {the_page_object_title}",
  async function(this: This, not: boolean, title: string) {
    await this.page.expect().titleContains(title, !not).poll();
  }
);

/**
 * Samples:
 * I expect the page title to match the "my-app" page's title
 * I expect the page title to be "title"
 * I expect the page title to not match the "my-app" page's title
 * I expect the page title to not be "title"
 */
Then(
  "I expect the page title {to_or_to_not} be/match {the_page_object_title}",
  async function(this: This, not: boolean, title: string) {
    await this.page.expect().titleEquals(title, !not).poll();
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
    await this.page.expect().urlContains(url, !not).poll();
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
    await this.page.expect().urlEquals(url, !not).poll();
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
    await this.page.expect().windowCountEquals(value, !not).poll();
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
    switch (count) {
      case Count.LESS: {
        await this.page.expect().windowCountLessThan(value, !not).poll();
        break;
      }
      default: {
        await this.page.expect().windowCountMoreThan(value, !not).poll();
        break;
      }
    }
  }
);

