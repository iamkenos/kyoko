import { LocatorFilters } from "playwright";
import { Component, ExpectedConditionKwargs } from "@iamkenos/kyoko";


export class NavigationBar extends Component {

  constructor(filters?: LocatorFilters) {
    super("//nav", filters);
  }

  navItem = (text: string) => this.locator("//ul/li", { hasText: text });

  private selectedCondition(text: string, kwargs?: ExpectedConditionKwargs) {
    const locator = this.navItem(text);
    return locator.expect().attributeEquals("class", "active", kwargs);
  }

  async clickItem(text: string) {
    const locator = this.navItem(text);
    await locator.expect().displayed().poll();

    await locator.hoverIntoView();
    await locator.clickUntil(this.selectedCondition(text), { delay: 500 });
  }

  async expectNavBarItemIsSelected(text: string, kwargs?: ExpectedConditionKwargs) {
    await this.selectedCondition(text, kwargs).poll();
  }

  async expectNavBarItemExists(text: string, kwargs?: ExpectedConditionKwargs) {
    const locator = this.navItem(text);
    await locator.expect().exists(kwargs).poll();
  }
}
