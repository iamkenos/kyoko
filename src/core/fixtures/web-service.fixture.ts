import { Fixture } from "./fixture";
import type { ContextParameters } from "@config/types";

export abstract class WebService<Parameters = ContextParameters> extends Fixture<Parameters> {

  constructor() {
    super();
  }
}
