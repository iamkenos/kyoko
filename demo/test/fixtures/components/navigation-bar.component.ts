import { Component, LocatorFilters } from "@iamkenos/kyoko/core";

import type { ExpectedConditionKwargs } from "@iamkenos/kyoko/conditions";

export class NavigationBar extends Component {

  constructor(filters?: LocatorFilters) {
    super("//nav", filters);
  }

  navItem = (text: string) => this.locator("//ul/li", { hasText: text });

  async clickItem(text: string) {
    const locator = this.navItem(text);
    await locator.expect().displayed().poll();
    await locator.click();
  }

  async expectNavBarItemIsSelected(text: string, kwargs?: ExpectedConditionKwargs) {
    const locator = this.navItem(text);
    await locator.expect().attributeEquals("class", "active", kwargs).poll();
  }

  async expectNavBarItemExists(text: string, kwargs?: ExpectedConditionKwargs) {
    const locator = this.navItem(text);
    await locator.expect().exists(kwargs).poll();
  }
}
