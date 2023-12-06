import { Before, Then, When } from "@cucumber/cucumber";
import { World } from "../../../../../build/core/world";
import { DemoPage } from "./demo.page";

export interface This extends World {
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
