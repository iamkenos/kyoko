import { Before } from "@cucumber/cucumber";
import { World } from "@iamkenos/kyoko/core";
import { TheInternetPage } from "./the-internet.page";
import { ExitIntentPage } from "./exit-intent/exit-intent.page";
import { LoginPage } from "./login/login.page";
import { SecurePage } from "./secure/secure.page";

export interface This extends World {
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
