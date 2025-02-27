import { Count, MatchContext } from "@core/gherkin/enums";

import type { PageSnapshotOptions } from "@config/types";
import type { Page } from "@fixtures/page/types";
import type { ExpectedConditionKwargs } from "@conditions/types";
import type { PageObject } from "@core/page-object";

export async function expectPageHasFullyLoaded(page: PageObject, kwargs?: ExpectedConditionKwargs) {
  await page.expect().loaded(kwargs).poll();
}

export async function expectPageSnapshotMatches(page: Page, filename: string, kwargs?: ExpectedConditionKwargs & { options?: PageSnapshotOptions }) {
  await page.expect()
    .setName(expectPageSnapshotMatches.name)
    .snapshotMatch(filename, kwargs).poll();
}

export async function expectPageTitleMatches(page: Page, expected: string, context?: MatchContext, kwargs?: ExpectedConditionKwargs & { options?: PageSnapshotOptions }) {
  const expectPageTitleContains = async() => await page.expect()
    .setName(expectPageTitleContains.name)
    .titleContains(expected, kwargs).poll();
  const expectPageTitleEquals = async() => await page.expect()
    .setName(expectPageTitleEquals.name)
    .titleEquals(expected, kwargs).poll();

  switch (context) {
    case MatchContext.CONTAIN:
    case MatchContext.PARTIAL: {
      await expectPageTitleContains();
      break;
    }
    default: {
      await expectPageTitleEquals();
      break;
    }
  }
}

export async function expectPageUrlMatches(page: Page, expected: string, context?: MatchContext, kwargs?: ExpectedConditionKwargs & { options?: PageSnapshotOptions }) {
  const expectPageUrlContains = async() => await page.expect()
    .setName(expectPageUrlContains.name)
    .urlContains(expected, kwargs).poll();
  const expectPageUrlEquals = async() => await page.expect()
    .setName(expectPageUrlEquals.name)
    .urlEquals(expected, kwargs).poll();

  switch (context) {
    case MatchContext.CONTAIN:
    case MatchContext.PARTIAL: {
      await expectPageUrlContains();
      break;
    }
    default: {
      await expectPageUrlEquals();
      break;
    }
  }
}

export async function expectWindowCountMatches(page: Page, expected: number, context: Count, kwargs?: ExpectedConditionKwargs) {
  const expectWindowCountLessThan = async() => await page.expect()
    .setName(expectWindowCountLessThan.name)
    .windowCountLessThan(expected, kwargs).poll();
  const expectWindowCountMoreThan = async() => await page.expect()
    .setName(expectWindowCountLessThan.name)
    .windowCountMoreThan(expected, kwargs).poll();
  const expectWindowCountEquals = async() => await page.expect()
    .setName(expectWindowCountLessThan.name)
    .windowCountEquals(expected, kwargs).poll();

  switch (context) {
    case Count.LESS: {
      await expectWindowCountLessThan();
      break;
    }
    case Count.GREATER:
    case Count.MORE: {
      await expectWindowCountMoreThan();
      break;
    }
    default: {
      await expectWindowCountEquals();
      break;
    }
  }
}

