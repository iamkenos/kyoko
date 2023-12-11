import { Component } from "@iamkenos/kyoko/core";

export class Modal extends Component {
  selector = "#ouibounce-modal";
  title = this.root.locator("//*[contains(@class,'modal-title')]");
  body = this.root.locator("//*[contains(@class,'modal-body')]");
  footer = this.root.locator("//*[contains(@class,'modal-footer')]");

  async close() {
    await this.footer.click();
  }
}
