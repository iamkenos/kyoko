import { Component, LocatorFilters } from "@iamkenos/kyoko/core";

export class Modal extends Component {

  constructor(filters?: LocatorFilters) {
    super("#ouibounce-modal", filters);
  }

  title = () => this.locator("//*[contains(@class,'modal-title')]");
  body = () => this.locator("//*[contains(@class,'modal-body')]");
  footer = () => this.locator("//*[contains(@class,'modal-footer')]");

  async close() {
    await this.footer().click();
  }
}
