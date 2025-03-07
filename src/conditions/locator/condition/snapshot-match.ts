import { SnapshotMatch as LocatorCondition } from "@conditions/page/condition/snapshot-match";

import type { ExpectedConditionKwargs } from "@conditions/types";
import type { LocatorSnapshotOptions } from "@config/types";

export class SnapshotMatch extends LocatorCondition {

  constructor(filename: string, kwargs: ExpectedConditionKwargs & { options?: LocatorSnapshotOptions }) {
    super(filename, kwargs);
  }

  async evaluate() {
    this.page = this.locator.page();
    return super.evaluate();
  }
}
