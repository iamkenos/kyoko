import { SnapshotMatch as ExpectedCondition } from "@conditions/page/snapshot-match";
import { LocatorSnapshotOptions } from "@generics";

export class SnapshotMatch extends ExpectedCondition {

  public constructor(filename: string, options?: LocatorSnapshotOptions, preferred?: boolean) {
    super(filename, options, preferred);
  }

  async evaluate() {
    this.page = this.locator.page();
    return super.evaluate();
  }
}
