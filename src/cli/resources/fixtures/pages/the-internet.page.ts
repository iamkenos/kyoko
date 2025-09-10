import { WebPage } from "@iamkenos/kyoko/core";
import type { Parameters } from "./the-internet.steps";

export class TheInternetPage extends WebPage<Parameters> {
  url = "/";
  title = "The Internet";

  updateParameters() {
    this.parameters.something = "something else";
  }
}
