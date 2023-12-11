
import { TheInternetPage } from "../the-internet.page";

export class LoginPage extends TheInternetPage {
  url = "/login";

  divFlashMessage = this.page.locator("#flash");
  tfUsername = this.page.locator("#username");
  tfPassword = this.page.locator("#password");
  btnLogin = this.page.locator("//button[@type='submit']");
}
