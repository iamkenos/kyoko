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

import type { Page } from "@fixtures/page/types";
import type { PageSnapshotOptions } from "@config/types";
import type { ExpectedConditionKwargs, ExpectedConditionOptions } from "../types";

export class PageConditions extends ExpectedConditions {
  protected page: Page;

  constructor(page: Page, options?: ExpectedConditionOptions) {
    super(options);
    this.page = page;
  }

  dialogTextContains(expected: string, kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new DialogTextContains(expected, kwargs));
  }

  dialogTextEquals(expected?: string, kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new DialogTextEquals(expected, kwargs));
  }

  domContentLoaded(kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new DomContentLoaded(kwargs));
  }

  snapshotMatch(filename: string, kwargs?: ExpectedConditionKwargs & { options?: PageSnapshotOptions }) {
    return this.addCondition(new SnapshotMatch(filename, kwargs));
  }

  titleContains(expected: string, kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new TitleContains(expected, kwargs));
  }

  titleEquals(expected?: string, kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new TitleEquals(expected, kwargs));
  }

  truthy(truthy: boolean | (() => Promise<boolean>) | (() => boolean), kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new Truthy(truthy, kwargs));
  }

  urlContains(expected: string, kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new UrlContains(expected, kwargs));
  }

  urlEquals(expected?: string, kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new UrlEquals(expected, kwargs));
  }

  windowCountEquals(count:number, kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new WindowCountEquals(count, kwargs));
  }

  windowCountLessThan(count:number, kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new WindowCountLessThan(count, kwargs));
  }

  windowCountMoreThan(count:number, kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new WindowCountMoreThan(count, kwargs));
  }
}
