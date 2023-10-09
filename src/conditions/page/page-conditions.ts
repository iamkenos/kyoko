import { ExpectedConditions } from "../expected-conditions";
import { DialogTextContains } from "./condition/dialog-text-contains";
import { DialogTextEquals } from "./condition/dialog-text-equals";
import { DomContentLoaded } from "./condition/dom-content-loaded";
import { SnapshotMatch } from "./condition/snapshot-match";
import { TitleContains } from "./condition/title-contains";
import { TitleEquals } from "./condition/title-equals";
import { Truthy } from "./condition/truthy";
import { UrlContains } from "./condition/url-contains";
import { UrlEquals } from "./condition/url-equals";
import { WindowCountEquals } from "./condition/window-count-equals";
import { WindowCountLessThan } from "./condition/window-count-less-than";
import { WindowCountMoreThan } from "./condition/window-count-more-than";

import type { Page } from "@commands/page/types";
import type { PageSnapshotOptions } from "@config/types";
import type { ExpectedConditionOptions } from "../types";

export class PageConditions extends ExpectedConditions {
  protected page: Page;

  constructor(page: Page, options?: ExpectedConditionOptions) {
    super(options);
    this.page = page;
  }

  dialogTextContains(expected: string, preferred?: boolean) {
    return this.addCondition(new DialogTextContains(expected, preferred));
  }

  dialogTextEquals(expected?: string, preferred?: boolean) {
    return this.addCondition(new DialogTextEquals(expected, preferred));
  }

  domContentLoaded(preferred?: boolean) {
    return this.addCondition(new DomContentLoaded(preferred));
  }

  snapshotMatch(filename: string, options?: PageSnapshotOptions, preferred?: boolean) {
    return this.addCondition(new SnapshotMatch(filename, options, preferred));
  }

  titleContains(expected: string, preferred?: boolean) {
    return this.addCondition(new TitleContains(expected, preferred));
  }

  titleEquals(expected?: string, preferred?: boolean) {
    return this.addCondition(new TitleEquals(expected, preferred));
  }

  truthy(expected: boolean | (() => Promise<boolean>), preferred?: boolean) {
    return this.addCondition(new Truthy(expected, preferred));
  }

  urlContains(expected: string, preferred?: boolean) {
    return this.addCondition(new UrlContains(expected, preferred));
  }

  urlEquals(expected?: string, preferred?: boolean) {
    return this.addCondition(new UrlEquals(expected, preferred));
  }

  windowCountEquals(count:number, preferred?: boolean) {
    return this.addCondition(new WindowCountEquals(count, preferred));
  }

  windowCountLessThan(count:number, preferred?: boolean) {
    return this.addCondition(new WindowCountLessThan(count, preferred));
  }

  windowCountMoreThan(count:number, preferred?: boolean) {
    return this.addCondition(new WindowCountMoreThan(count, preferred));
  }
}
