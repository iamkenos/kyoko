import { PageObject } from "@iamkenos/kyoko/core";
import { NavigationBar } from "../../components/navigation-bar.component";

export class DemoPage extends PageObject {
  url = "/index.html";
  title = "Demo Site";

  hSectionHeader = this.page.locator("//h5");
  navBar = this.page.component(NavigationBar);
}
