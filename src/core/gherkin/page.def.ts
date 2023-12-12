import { Given, Then, When } from "@cucumber/cucumber";
import { Count, WindowDirection, WindowNavigation } from "./enums";

import type { World as This } from "../world";

Given(
  /^I am on the "([^"]*)?" (?:page|site|portal)$/,
  async function(this: This, page: string) {
    const pageObject = this.findPageObject(page, true);
    await pageObject.navigate();
  }
);

When(
  /^I move out of the viewport$/,
  async function(this: This) {
    await this.page.locator("html").dispatchEvent("mouseleave");
  }
);

When(
  /^I close the last opened (?:window|tab)$/,
  async function(this: This) {
    this.page = await this.context.closeLastPage();
  }
);

When(
  /^I close all (?:except the parent|other) (?:window|tab)(?:s)?$/,
  async function(this: This) {
    this.page = await this.context.closeOtherPages();
  }
);

When(
  /^I( always)? auto (accept|dismiss)(?: and type "([^"]*)?" on)? the page dialog(?:s)?$/,
  async function(this: This, always: string, action: any, text?: string) {
    this.page.dialogListener({ action, text, once: !always });
  }
);

When(
  /^I press the "([^"]*)?" key(?:s)?(?: (\d+) times)?$/,
  async function(this: This, key: string, count: number) {
    const repeats = +count || 1;
    for (let i = 0; i < repeats; i++) {
      await this.page.keyboard.press(key);
    }
  }
);

When(
  /^I start (?:to intercept|observing the) (?:ajax|xhr|network|api) (?:requests|calls)$/,
  async function(this: This) {
    this.page.requestsInterceptor();
  }
);

When(
  /^I scroll to the coordinates (\d+).(\d+) of the page$/,
  async function(this: This, x: number, y: number) {
    await this.page.scrollTo({ x, y });
  }
);

When(
  /^I scroll to the (bottom|top) of the page$/,
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

When(
  /^I (?:focus on|switch to) the(?: "([^"]*)?" page's)? (?:"([^"]*)?" iframe|parent context)$/,
  async function(this: This, page: string, frame: string) {
    const selector = this.findPageObjectProp(page, frame);
    this.page.switchToFrame(selector);
  }
);

When(
  /^I open the (?:"([^"]*)?" page's url|url "([^"]*)?") on a new window$/,
  async function(this: This, page: string, url?: string) {
    const pageObject = this.findPageObject(page);
    const newPage = await this.context.newPage();
    await newPage.goto(url || pageObject.url);
    await newPage.expect().domContentLoaded().poll();
  }
);

When(
  /^I (?:focus on|switch to) the last opened (?:window|tab)$/,
  async function(this: This) {
    await this.page.expect().windowCountMoreThan(1).poll();
    this.page = this.context.lastPage();
  }
);

When(
  /^I navigate (back|forward) from the current page(?: (\d+) times)?$/,
  async function(this: This, navigate: WindowNavigation, count: number) {
    const repeats = count || 1;
    for (let i = 0; i < repeats; i++) {
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

Then(
  /^I expect to(?: still)? be(?: back)? (?:redirected to|on) the "([^"]*)?" (?:page|site|portal)$/,
  async function(this: This, page: string) {
    const pageObject = this.findPageObject(page);
    await this.page.expect().domContentLoaded().urlEquals(pageObject.url).titleEquals(pageObject.title).poll();
  }
);

Then(
  /^I expect (?:a|an|the) (?:alert|confirm box|prompt) to( not)? have been opened$/,
  async function(this: This, not: boolean) {
    const dialogOpened = () => this.page.dialog.handled;
    await this.page.expect().truthy(dialogOpened, !not).poll();
  }
);

Then(
  /^I expect the (?:alert|confirm box|prompt) text to( not)? contain "([^"]*)?"$/,
  async function(this: This, not: boolean, expected: string) {
    await this.page.expect().dialogTextContains(expected, !not).poll();
  }
);

Then(
  /^I expect the (?:alert|confirm box|prompt) text to( not)? be "([^"]*)?"$/,
  async function(this: This, not: boolean, expected: string) {
    await this.page.expect().dialogTextEquals(expected, !not).poll();
  }
);

Then(
  /^I expect the (viewport|page) to( not)? match the snapshot "([^"]*)?"$/,
  async function(this: This, context: string, not: boolean, filename: string) {
    await this.page.expect().snapshotMatch(filename, { fullPage: context.length === 4 }, !not).poll();
  }
);

Then(
  /^I expect the (?:window|page) title to( not)? contain (?:the "([^"]*)?" page's title|"([^"]*)?")$/,
  async function(this: This, not: boolean, page: string, title?: string) {
    await this.page.expect().titleContains(title || this.findPageObject(page).title, !not).poll();
  }
);

Then(
  /^I expect the (?:window|page) title to( not)? (?:be|match) (?:the "([^"]*)?" page's title|"([^"]*)?")$/,
  async function(this: This, not: boolean, page: string, title?: string) {
    await this.page.expect().titleEquals(title || this.findPageObject(page).title, !not).poll();
  }
);

Then(
  /^I expect the url to( not)? contain (?:the "([^"]*)?" page's url|"([^"]*)?")$/,
  async function(this: This, not: boolean, page: string, url?: string) {
    await this.page.expect().urlContains(url || this.findPageObject(page).url, !not).poll();
  }
);

Then(
  /^I expect the url to( not)? (?:be|match) (?:the "([^"]*)?" page's url|"([^"]*)?")$/,
  async function(this: This, not: boolean, page: string, url?: string) {
    await this.page.expect().urlEquals(url || this.findPageObject(page).url, !not).poll();
  }
);

Then(
  /^I expect the (?:window|tab) count to( not)? be (\d+)$/,
  async function(this: This, not: boolean, value: number) {
    await this.page.expect().windowCountEquals(value, !not).poll();
  }
);

Then(
  /^I expect the (?:window|tab) count to( not)? be (less|more) than (\d+)$/,
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

