
import { TheInternetPage } from "../the-internet.page";

export class LoginPage extends TheInternetPage {
  url = "/login";

  flashMessage = () => this.page.locator("#flash");
  username = () => this.page.locator("#username");
  password = () => this.page.locator("#password");
  login = () => this.page.locator("//button[@type='submit']");
}
