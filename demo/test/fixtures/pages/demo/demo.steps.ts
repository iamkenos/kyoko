import { Before, Then, When } from "@cucumber/cucumber";

import { BaseWorld as BaseThis } from "@generics";
import { DemoPage } from "./demo.page";

interface This extends BaseThis {
  demoPage: DemoPage;
}

Before({}, async function(this: This) {
  this.demoPage = new DemoPage(this);
});

When(
  /^I click the "([^"]*)?" navigation item$/,
  async function(this: This, text: string) {
    await this.demoPage.whenClickNavItem(text);
  }
);

Then(
  /^I expect the navigation item "([^"]*)?" to( not)? be selected$/,
  async function(this: This, text: string, not?: boolean) {
    await this.demoPage.thenNavItemSelected(text, not);
  }
);

Then(
  /^I expect the section header "([^"]*)?" to( not)? exist$/,
  async function(this: This, text: string, not?: boolean) {
    await this.demoPage.thenNavItemExists(text, not);
  }
);
