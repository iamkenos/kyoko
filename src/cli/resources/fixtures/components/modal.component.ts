import { Component } from "@iamkenos/kyoko/core";

export class Modal extends Component {
  title = this.locator("//*[contains(@class,'modal-title')]");
  body = this.locator("//*[contains(@class,'modal-body')]");
  footer = this.locator("//*[contains(@class,'modal-footer')]");

  constructor() {
    super("#ouibounce-modal");
  }

  async close() {
    await this.footer.click();
  }
}
