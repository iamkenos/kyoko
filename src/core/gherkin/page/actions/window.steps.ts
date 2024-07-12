import { Given, When } from "@cucumber/cucumber";
import {
  WindowDirection,
  WindowNavigation
} from "@core/gherkin/enums";

import type { PageObject } from "@core/page-object";
import type { World as This } from "@core/world";

/**
 * Samples:
 * I am on the "my-app" page
 * I am on the "my-app" site
 * I am on the "my-app" portal
 */
Given(
  "I am on the {page_object_persisted} page/site/portal",
  async function(this: This, page: PageObject) {
    await page.navigate();
  }
);

/**
 * Samples:
 * I move out of the viewport
 */
When(
  "I move out of the viewport",
  async function(this: This) {
    await this.page.locator("html").dispatchEvent("mouseleave");
  }
);

/**
 * Samples:
 * I close the last opened window
 * I close the last opened tab
 */
When(
  "I close the last opened window/tab",
  async function(this: This) {
    this.page = await this.context.closeLastPage();
  }
);

/**
 * Samples:
 * I close all the other opened windows
 * I close all the other opened tabs
 */
When(
  "I close all the other windows/tabs",
  async function(this: This) {
    this.page = await this.context.closeOtherPages();
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
  async function(this: This, key: string, count: number) {
    for (let i = 0; i < count; i++) {
      await this.page.keyboard.press(key);
    }
  }
);

/**
 * Samples:
 * I start recording the network requests
 */
When(
  "I start recording the network requests",
  async function(this: This) {
    this.page.requestsInterceptor();
  }
);

/**
 * Samples:
 * I scroll to the 123,456 coordinates of the page
 * I scroll to the -123.2,-456.4 coordinates of the page
 */
When(
  "I scroll to the {float},{float} coordinates of the page",
  async function(this: This, x: number, y: number) {
    await this.page.scrollTo({ x, y });
  }
);

/**
 * Samples:
 * I scroll to the top of the page
 * I scroll to the bottom of the page
 */
When(
  "I scroll to the {top_or_bottom} of the page",
  async function(this: This, direction: WindowDirection) {
    switch (direction) {
      case WindowDirection.BOTTOM: {
        await this.page.scrollToBottom();
        break;
      }
      default: {
        await this.page.scrollToTop();
        break;
      }
    }
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
  async function(this: This, frame: string) {
    this.page.switchToFrame(frame);
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
  async function(this: This) {
    this.page.switchToFrame();
  }
);

/**
 * Samples:
 * I open the "my-app" page's url
 * I open the url "/asdf"
 */
When(
  "I open the {page_object_url}",
  async function(this: This, url: string) {
    await this.page.goto(url);
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
  async function(this: This, url: string) {
    const newPage = await this.context.newPage();
    await newPage.goto(url);
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
  async function(this: This) {
    await this.page.expect().windowCountMoreThan(1).poll();
    this.page = this.context.lastPage();
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
  async function(this: This, navigate: WindowNavigation, count: number) {
    for (let i = 0; i < count; i++) {
      switch (navigate) {
        case WindowNavigation.BACK: {
          await this.page.goBack();
          break;
        }
        default: {
          await this.page.goForward();
          break;
        }
      }
    }
  }
);
