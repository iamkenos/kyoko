import { Component, ExpectedConditionKwargs, ExpectedConditionOptions, LocatorConditions } from "@iamkenos/kyoko";


export class NavigationBar extends Component {

  constructor() {
    super("//nav");
  }

  navItem = (text: string) => this.locator("//ul/li", { hasText: text });

  override expect(options?: ExpectedConditionOptions) {
    return new NavigationBarConditions(this, options);
  }

  async clickItem(text: string) {
    const locator = this.navItem(text);
    await locator.expect().displayed().poll();

    await locator.hoverIntoView();
    await locator.clickUntil(this.expect().active(text), { delay: 500 });
  }
}


class NavigationBarConditions extends LocatorConditions<NavigationBar> {

  active(text: string, kwargs?: ExpectedConditionKwargs) {
    const locator = this.locator.navItem(text);
    return locator.expect().attributeEquals("class", "active", kwargs);
  }
}
