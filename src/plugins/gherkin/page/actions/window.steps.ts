import { Given, When } from "@cucumber/cucumber";
import {
  WindowDirection,
  WindowNavigation
} from "@plugins/gherkin/enums";

import type { Context } from "@plugins/fixture/context/context.fixture";
import type { PageObject } from "@plugins/fixture/page/page.fixture";

import * as fn from "./window.glue";

/**
 * Samples:
 * I am on the "my-app" page
 * I am on the "my-app" site
 * I am on the "my-app" portal
 */
Given(
  "I am on the {page_object_persisted} page/site/portal",
  async function(this: Context, page: PageObject) {
    await fn.navigate(page);
  }
);

/**
 * Samples:
 * I move out of the viewport
 */
When(
  "I move out of the viewport",
  async function(this: Context) {
    await fn.leaveViewport(this.page);
  }
);

/**
 * Samples:
 * I close the last opened window
 * I close the last opened tab
 */
When(
  "I close the last opened window/tab",
  async function(this: Context) {
    this.page = await fn.closeLastOpenedPage(this);
  }
);

/**
 * Samples:
 * I close all the other opened windows
 * I close all the other opened tabs
 */
When(
  "I close all the other windows/tabs",
  async function(this: Context) {
    this.page = await fn.closeOtherPages(this);
  }
);

/**
 * Samples:
 * I press the "Enter" key
 * I press the "Shift+Insert" keys
 * I press the "Enter" key 2 times
 * I press the "Shift+Insert" keys 2 times
 */
When(
  "I press the {input_string} key(s){repeats}",
  async function(this: Context, key: string, count: number) {
    for (let i = 0; i < count; i++) {
      await fn.press(this.page, key);
    }
  }
);

/**
 * Samples:
 * I start recording the network requests
 */
When(
  "I start recording the network requests",
  async function(this: Context) {
    fn.recordRequests(this.page);
  }
);

/**
 * Samples:
 * I scroll to the 123,456 coordinates of the page
 * I scroll to the -123.2,-456.4 coordinates of the page
 */
When(
  "I scroll to the {float},{float} coordinates of the page",
  async function(this: Context, x: number, y: number) {
    fn.scrollToCoordinates(this.page, { x, y });
  }
);

/**
 * Samples:
 * I scroll to the top of the page
 * I scroll to the bottom of the page
 */
When(
  "I scroll to the {top_or_bottom} of the page",
  async function(this: Context, direction: WindowDirection) {
    await fn.scrollTo(this.page, direction);
  }
);

/**
 * Samples:
 * I focus on the "framelocator" iframe
 * I focus on the "my-app" page's "prop" iframe
 * I switch to the "framelocator" iframe
 * I switch to the "my-app" page's "prop" iframe
 */
When(
  "I focus/switch on/to the {page_object_prop} iframe",
  async function(this: Context, frame: string) {
    await fn.switchToFrame(this.page, frame);
  }
);

/**
 * Samples:
 * I focus on the main context
 * I focus on the parent context
 * I switch to the main context
 * I switch to the parent context
 */
When(
  "I focus/switch on/to the parent/main context",
  async function(this: Context) {
    await fn.switchToFrame(this.page);
  }
);

/**
 * Samples:
 * I open the "my-app" page's url
 * I open the url "/asdf"
 */
When(
  "I open the {page_object_url}",
  async function(this: Context, url: string) {
    await fn.open(this.page, url);
  }
);

/**
 * Samples:
 * I open the "my-app" page's url on a new window
 * I open the "my-app" page's url on a new tab
 * I open the url "/asdf" on a new window
 * I open the url "/asdf" on a new tab
 */
When(
  "I open the {page_object_url} on a new window/tab",
  async function(this: Context, url: string) {
    await fn.openInNewTab(this.browser, url);
  }
);

/**
 * Samples:
 * I focus on the last opened window
 * I focus on the last opened tab
 * I switch to the last opened window
 * I switch to the last opened tab
 */
When(
  "I focus/switch on/to the last opened window/tab",
  async function(this: Context) {
    this.page = await fn.focusOnTheLastOpenedTab(this);
  }
);

/**
 * Samples:
 * I navigate back from the current page
 * I navigate forward from the current page
 * I navigate back from the current page 2 times
 * I navigate forward from the current page 2 times
 */
When(
  "I navigate {back_or_forward} from the current page{repeats}",
  async function(this: Context, direction: WindowNavigation, count: number) {
    for (let i = 0; i < count; i++) {
      await fn.navigateDirection(this.page, direction);
    }
  }
);
