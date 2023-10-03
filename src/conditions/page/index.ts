import type { ExpectedConditionOptions } from "../types";
import type { Page } from "@commands/page/types";

import { PageSnapshotOptions } from "@generics";
import { ExpectedConditions } from "../expected-conditions";
import { DomContentLoaded } from "./dom-content-loaded";
import { SnapshotMatch } from "./snapshot-match";
import { TitleContains } from "./title-contains";
import { TitleEquals } from "./title-equals";
import { UrlContains } from "./url-contains";
import { UrlEquals } from "./url-equals";
import { WindowCountEquals } from "./window-count-equals";
import { WindowCountLessThan } from "./window-count-less-than";
import { WindowCountMoreThan } from "./window-count-more-than";

export class PageConditions extends ExpectedConditions {
  private readonly page: Page;

  constructor(page: Page, options?: ExpectedConditionOptions) {
    super(options);
    this.page = page;
  }

  domContentLoaded(preferred?: boolean) {
    return this.addCondition(new DomContentLoaded(preferred).setPage(this.page));
  }

  snapshotMatch(filename: string, options?: PageSnapshotOptions, preferred?: boolean) {
    return this.addCondition(new SnapshotMatch(filename, options, preferred).setPage(this.page));
  }

  titleContains(expected: string, preferred?: boolean) {
    return this.addCondition(new TitleContains(expected, preferred).setPage(this.page));
  }

  titleEquals(expected: string, preferred?: boolean) {
    return this.addCondition(new TitleEquals(expected, preferred).setPage(this.page));
  }

  urlContains(expected: string, preferred?: boolean) {
    return this.addCondition(new UrlContains(expected, preferred).setPage(this.page));
  }

  urlEquals(expected: string, preferred?: boolean) {
    return this.addCondition(new UrlEquals(expected, preferred).setPage(this.page));
  }

  windowCountEquals(count:number, preferred?: boolean) {
    return this.addCondition(new WindowCountEquals(count, preferred).setPage(this.page));
  }

  windowCountLessThan(count:number, preferred?: boolean) {
    return this.addCondition(new WindowCountLessThan(count, preferred).setPage(this.page));
  }

  windowCountMoreThan(count:number, preferred?: boolean) {
    return this.addCondition(new WindowCountMoreThan(count, preferred).setPage(this.page));
  }
}
