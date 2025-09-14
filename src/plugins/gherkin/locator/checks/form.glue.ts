import {
  MatchContext,
  SelectOptionContext
} from "@plugins/gherkin/enums";

import type { Locator } from "playwright";
import type { ExpectedConditionKwargs } from "@plugins/conditions/types";

export async function expectElementIsSelected(locator: Locator, kwargs?: ExpectedConditionKwargs) {
  await locator.expect()
    .setName(expectElementIsSelected.name)
    .checked(kwargs).poll();
}

export async function expectDropdownOptionIsSelected(locator: Locator, expected: string | number, context: SelectOptionContext, kwargs?: ExpectedConditionKwargs) {
  const options = await locator.getSelectOptions();
  const kwargz = { ...(kwargs || {}), selectContext: `By ${context}` };

  let option: Locator;
  switch (context) {
    case SelectOptionContext.LABEL: {
      option = options.find(i => i.label === expected).locator;
      break;
    }
    case SelectOptionContext.VALUE: {
      option = options.find(i => i.value === expected).locator;
      break;
    }
    default: {
      option = options.find(i => i.index === expected as number - 1).locator;
    }
  }

  option.expect()
    .setName(expectDropdownOptionIsSelected.name)
    .selected(kwargz).poll();
}

export async function expectElementValueMatches(locator: Locator, expected: string, context?: MatchContext, kwargs?: ExpectedConditionKwargs) {
  const expectElementValueContains = async() => await locator.expect()
    .setName(expectElementValueContains.name)
    .valueContains(expected, kwargs).poll();
  const expectElementValueEquals = async() => await locator.expect()
    .setName(expectElementValueEquals.name)
    .valueEquals(expected, kwargs).poll();

  switch (context) {
    case MatchContext.CONTAIN:
    case MatchContext.PARTIAL: {
      await expectElementValueContains();
      break;
    }
    default: {
      await expectElementValueEquals();
      break;
    }
  }
}

export async function expectElementValueIsEmpty(locator: Locator, kwargs?: ExpectedConditionKwargs) {
  await locator.expect()
    .setName(expectElementValueIsEmpty.name)
    .valueEmpty(kwargs).poll();
}
