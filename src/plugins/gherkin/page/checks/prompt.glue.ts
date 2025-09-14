import { MatchContext } from "@plugins/gherkin/enums";

import type { Page } from "playwright";
import type { ExpectedConditionKwargs } from "@plugins/conditions/types";

export async function expectDialogWasOpened(page: Page, kwargs?: ExpectedConditionKwargs) {
  const dialogOpened = () => page.dialog.handled;
  await page.expect()
    .setName(expectDialogWasOpened.name)
    .predicate(dialogOpened, kwargs).poll();
}

export async function expectDialogTextMatches(page: Page, expected: string, context: MatchContext, kwargs?: ExpectedConditionKwargs) {
  const expectDialogTextContains = async() => await page.expect()
    .setName(expectDialogTextContains.name)
    .dialogTextContains(expected, kwargs).poll();
  const expectDialogTextEquals = async() => await page.expect()
    .setName(expectDialogTextEquals.name)
    .dialogTextEquals(expected, kwargs).poll();

  switch (context) {
    case MatchContext.CONTAIN:
    case MatchContext.PARTIAL: {
      await expectDialogTextContains();
      break;
    }
    default: {
      await expectDialogTextEquals();
      break;
    }
  }
}
