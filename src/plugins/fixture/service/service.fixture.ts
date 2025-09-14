import { Fixture } from "@plugins/fixture/fixture";

import type { ContextParameters } from "@config/types";

export abstract class Service<Parameters = ContextParameters> extends Fixture<Parameters> {

  constructor() {
    super();
  }
}
