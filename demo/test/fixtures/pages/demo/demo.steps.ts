import { Before, Then, When } from "@cucumber/cucumber";
import { Context } from "@iamkenos/kyoko";
import { DemoPage } from "./demo.page";

export interface This extends Context {
  demoPage: DemoPage;
}

Before({}, async function(this: This) {
  this.demoPage = new DemoPage();
});

When(
  "I click the {input_string} navigation item",
  async function(this: This, text: string) {
    await this.demoPage.navBar().clickItem(text);
  }
);

Then(
  "I expect the navigation item {input_string} {to_or_to_not} be selected",
  async function(this: This, text: string, not: boolean) {
    await this.demoPage.navBar().expectNavBarItemIsSelected(text, { not });
  }
);

Then(
  "I expect the section header {input_string} {to_or_to_not} exist",
  async function(this: This, text: string, not?: boolean) {
    await this.demoPage.navBar().expectNavBarItemExists(text, { not });
  }
);
