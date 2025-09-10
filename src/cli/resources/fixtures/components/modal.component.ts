import { LocatorFilters } from "playwright";
import { WebComponent } from "@iamkenos/kyoko/core";
import { ExpectedConditionKwargs, ExpectedConditionOptions, LocatorConditions } from "@iamkenos/kyoko/conditions";

/**
 * WebComponent Demo
 *
 * You can create complex web components with its own API and override built-in locator methods.
 * This pattern is particularly useful when working with applications built by design systems.
 */
export class Modal extends WebComponent {

  constructor(filters?: LocatorFilters) {
    super("#ouibounce-modal", filters);
  }

  title = () => this.locator("//*[contains(@class,'modal-title')]");
  body = () => this.locator("//*[contains(@class,'modal-body')]");
  footer = () => this.locator("//*[contains(@class,'modal-footer')]");

  override expect(options?: ExpectedConditionOptions) {
    return new ModalConditions(this, options);
  }

  async close() {
    await this.footer().click();
  }
}


class ModalConditions extends LocatorConditions<Modal> {

  override textEquals(expected: string, kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(this.locator.body().expect().textEquals(expected, kwargs));
  }
}
