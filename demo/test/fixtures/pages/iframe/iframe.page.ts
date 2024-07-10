import { DemoPage } from "../demo/demo.page";

export class IframePage extends DemoPage {
  url = "/iframe.html";
  title = "Demo Iframe";

  tabs = () => this.page.locator("//ul//li[@class='tab']");
}
