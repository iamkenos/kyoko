import { Component } from "@iamkenos/kyoko/core";

export class NavigationBar extends Component {
  navItem = (text: string) => this.locator("//ul/li", { hasText: text });

  constructor() {
    super("//nav");
  }

  async clickItem(text: string) {
    const locator = this.navItem(text);
    await locator.expect().displayed().poll();
    await locator.click();
  }

  async expectItemSelected(text: string, not?: boolean) {
    const locator = this.navItem(text);
    await locator.expect().attributeEquals("class", "active", !not).poll();
  }

  async expectItemExists(text: string, not?: boolean) {
    const locator = this.navItem(text);
    await locator.expect().exists(!not).poll();
  }
}
