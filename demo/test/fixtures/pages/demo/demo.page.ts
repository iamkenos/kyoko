import { PageObject } from "@iamkenos/kyoko/core";

export class DemoPage extends PageObject {
  url = "/index.html";
  title = "Demo Site";

  hSectionHeader = this.page.locator("//h5");
  navBar = this.page.locator("//nav");
  navItem = (text: string) => this.navBar.locator("//ul/li", { hasText: text });

  async whenClickNavItem(text: string) {
    const locator = this.navItem(text);
    await locator.click();
  }

  async thenNavItemSelected(text: string, not?: boolean) {
    const locator = this.navItem(text);
    await locator.expect().attributeEquals("class", "active", !not).poll();
  }

  async thenNavItemExists(text: string, not?: boolean) {
    const locator = this.navItem(text);
    await locator.expect().exists(!not).poll();
  }
}
