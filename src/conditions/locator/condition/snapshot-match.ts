import { SnapshotMatch as LocatorCondition } from "@conditions/page/condition/snapshot-match";

import type { LocatorSnapshotOptions } from "@generics";

export class SnapshotMatch extends LocatorCondition {

  public constructor(filename: string, options?: LocatorSnapshotOptions, preferred?: boolean) {
    super(filename, options, preferred);
  }

  async evaluate() {
    this.page = this.locator.page();
    return super.evaluate();
  }
}
