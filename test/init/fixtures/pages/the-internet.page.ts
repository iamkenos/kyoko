import { PageObject } from "@iamkenos/kyoko";
import type { Parameters } from "./the-internet.steps";

export class TheInternetPage extends PageObject<Parameters> {
  url = "/";
  title = "The Internet";

  updateParameters() {
    this.parameters.something = "something else";
  }
}
