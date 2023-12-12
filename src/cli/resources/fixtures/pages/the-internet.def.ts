import { Before, Then, When } from "@cucumber/cucumber";
import { World } from "@iamkenos/kyoko/core";
import { TheInternetPage } from "./the-internet.page";
import { ExitIntentPage } from "./exit-intent/exit-intent.page";
import { LoginPage } from "./login/login.page";
import { SecurePage } from "./secure/secure.page";

/**
 * You can also optionally define a World parameters type for shared state across steps.
 * This is a built-in feature of cucumber and can be accessible on the `parameters` property from `this`.
 *
 * Note that this is completely optional. By design, you can always assign properties to the `parameters` object.
 * Defining an interface and passing it to the world and page objects are purely for type-safety.
 *
 * See this in action on the `world-parameters.feature` file.
 **/
export interface Parameters {
  something: string;
}

/** Extend the `World` type so you can access inherited properties from `this`. */
export interface This extends World<Parameters> {
  theInternetPage: TheInternetPage;
  exitIntentPage: ExitIntentPage;
  loginPage: LoginPage;
  securePage: SecurePage;
}

Before({}, async function(this: This) {
  this.theInternetPage = new TheInternetPage(this);
  this.exitIntentPage = new ExitIntentPage(this);
  this.loginPage = new LoginPage(this);
  this.securePage = new SecurePage(this);
});

When(
  /^I set the something parameter to "([^"]*)?"$/,
  async function(this: This, value: string) {
    this.parameters.something = value;
  }
);

When(
  /^I update the something parameter from the page$/,
  async function(this: This) {
    this.theInternetPage.updateParameters();
  }
);

Then(
  /^I expect the something parameter value to( not)? be "([^"]*)?"$/,
  async function(this: This, not: boolean, value: string) {
    await this.page.expect().equals(this.parameters.something, value, !not).poll();
  }
);
