import { SnapshotMatch as LocatorCondition } from "@conditions/page/condition/snapshot-match";

import type { LocatorSnapshotOptions } from "@config/types";

export class SnapshotMatch extends LocatorCondition {

  constructor(filename: string, options?: LocatorSnapshotOptions, preferred?: boolean) {
    super(filename, options, preferred);
  }

  async evaluate() {
    this.page = this.locator.page();
    return super.evaluate();
  }
}
