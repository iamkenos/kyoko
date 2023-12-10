import { Component } from "@iamkenos/kyoko/core";

export class NavigationBar extends Component {
  selector = "//nav";

  navItem = (text: string) => {
    return this.root.locator("//ul/li", { hasText: text });
  };

  clickItem = async(text: string) => {
    const locator = this.navItem(text);
    await locator.click();
  };

  expectItemSelected = async(text: string, not?: boolean) => {
    const locator = this.navItem(text);
    await locator.expect().attributeEquals("class", "active", !not).poll();
  };

  expectItemExists = async(text: string, not?: boolean) => {
    const locator = this.navItem(text);
    await locator.expect().exists(!not).poll();
  };
}
