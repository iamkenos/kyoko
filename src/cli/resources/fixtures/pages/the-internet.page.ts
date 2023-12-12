import { PageObject } from "@iamkenos/kyoko/core";
import type { Parameters } from "./the-internet.def";

export class TheInternetPage extends PageObject<Parameters> {
  url = "/";
  title = "The Internet";

  updateParameters() {
    this.parameters.something = "something else";
  }
}
