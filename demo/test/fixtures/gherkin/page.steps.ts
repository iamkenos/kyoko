import { Given, When } from "@cucumber/cucumber";

import { BaseWorld as This } from "@generics";

export enum WindowDirection {
  TOP = "top",
  BOTTOM = "bottom",
  CENTER = "center",
  LEFT = "left",
  RIGHT = "right"
}

Given(
  /^I am on the "([^"]*)?" (?:page|site|portal)$/,
  async function(this: This, page: string) {
    await this.findPageObject(page, true).whenNavigate();
  }
);

When(
  /^I press the "([^"]*)?" key(?: (\d+) times)?$/,
  async function(this: This, key: string, count: number) {
    const repeats = +count || 1;
    for (let i = 0; i < repeats; i++) {
      await this.page.keyboard.press(key);
    }
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

