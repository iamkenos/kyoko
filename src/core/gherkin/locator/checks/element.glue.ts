import {
  Axis,
  MatchContext,
  SizeContext
} from "@core/gherkin/enums";

import type { Locator } from "@fixtures/locator/types";
import type { ExpectedConditionKwargs } from "@conditions/types";
import type { LocatorSnapshotOptions } from "@config/types";

export async function expectElementAttributeMatches(locator: Locator, attribute: string, expected: string, context?: MatchContext, kwargs?: ExpectedConditionKwargs) {
  const expectElementAttributeContains = async() => await locator.expect()
    .setName(expectElementAttributeContains.name)
    .attributeContains(attribute, expected, kwargs).poll();
  const expectElementAttributeEquals = async() => await locator.expect()
    .setName(expectElementAttributeEquals.name)
    .attributeEquals(attribute, expected, kwargs).poll();

  switch (context) {
    case MatchContext.CONTAIN:
    case MatchContext.PARTIAL: {
      await expectElementAttributeContains();
      break;
    }
    default: {
      await expectElementAttributeEquals();
      break;
    }
  }
}

export async function expectElementAttributeExists(locator: Locator, attribute: string, kwargs?: ExpectedConditionKwargs) {
  await locator.expect()
    .setName(expectElementAttributeExists.name)
    .attributeExists(attribute, kwargs).poll();
}

export async function expectElementAxisLocationEquals(locator: Locator, axis: Axis, expected: number, kwargs?: ExpectedConditionKwargs) {
  await locator.expect()
    .setName(expectElementAxisLocationEquals.name)
    .axisLocationEquals(axis, expected, kwargs).poll();
}

export async function expectElementCountEquals(locator: Locator, expected: number, kwargs?: ExpectedConditionKwargs) {
  await locator.expect()
    .setName(expectElementCountEquals.name)
    .countEquals(expected, kwargs).poll();
}

export async function expectElementCountLessThan(locator: Locator, expected: number, kwargs?: ExpectedConditionKwargs) {
  await locator.expect()
    .setName(expectElementCountLessThan.name)
    .countLessThan(expected, kwargs).poll();
}

export async function expectElementCountMoreThan(locator: Locator, expected: number, kwargs?: ExpectedConditionKwargs) {
  await locator.expect()
    .setName(expectElementCountMoreThan.name)
    .countMoreThan(expected, kwargs).poll();
}

export async function expectElementCssPropertyExists(locator: Locator, property: string, kwargs?: ExpectedConditionKwargs) {
  await locator.expect()
    .setName(expectElementCssPropertyExists.name)
    .cssPropertyExists(property, kwargs).poll();
}

export async function expectElementDimensionEquals(locator: Locator, width: number, height: number, kwargs?: ExpectedConditionKwargs) {
  await locator.expect()
    .setName(expectElementDimensionEquals.name)
    .dimensionEquals(width, height, kwargs).poll();
}

export async function expectElementDimensionSideEquals(locator: Locator, expected: number, side: SizeContext, kwargs?: ExpectedConditionKwargs) {
  await locator.expect()
    .setName(expectElementDimensionSideEquals.name)
    .dimensionSideEquals(side, expected, kwargs).poll();
}

export async function expectElementIsDisplayed(locator: Locator, kwargs?: ExpectedConditionKwargs) {
  await locator.expect()
    .setName(expectElementIsDisplayed.name)
    .displayed(kwargs).poll();
}

export async function expectElementIsDisplayedInViewport(locator: Locator, kwargs?: ExpectedConditionKwargs) {
  await locator.expect()
    .setName(expectElementIsDisplayedInViewport.name)
    .displayedInViewport(kwargs).poll();
}

export async function expectElementIsEnabled(locator: Locator, kwargs?: ExpectedConditionKwargs) {
  await locator.expect()
    .setName(expectElementIsEnabled.name)
    .enabled(kwargs).poll();
}

export async function expectElementExists(locator: Locator, kwargs?: ExpectedConditionKwargs) {
  await locator.expect()
    .setName(expectElementExists.name)
    .exists(kwargs).poll();
}

export async function expectElementHasFocus(locator: Locator, kwargs?: ExpectedConditionKwargs) {
  await locator.expect()
    .setName(expectElementHasFocus.name)
    .focused(kwargs).poll();
}

export async function expectElementSnapshotMatches(locator: Locator, filename: string, kwargs?: ExpectedConditionKwargs & { options?: LocatorSnapshotOptions }) {
  await locator.expect()
    .setName(expectElementHasFocus.name)
    .snapshotMatch(filename, kwargs).poll();
}

export async function expectElementTextMatches(locator: Locator, expected: string, context?: MatchContext, kwargs?: ExpectedConditionKwargs) {
  const expectElementTextContains = async() => await locator.expect()
    .setName(expectElementTextContains.name)
    .textContains(expected, kwargs).poll();
  const expectElementTextEquals = async() => await locator.expect()
    .setName(expectElementTextEquals.name)
    .textEquals(expected, kwargs).poll();

  switch (context) {
    case MatchContext.CONTAIN:
    case MatchContext.PARTIAL: {
      await expectElementTextContains();
      break;
    }
    default: {
      await expectElementTextEquals();
      break;
    }
  }
}

export async function expectElementTextsMatches(locator: Locator, expected: string[], context?: MatchContext, kwargs?: ExpectedConditionKwargs) {
  const actual = await locator.allTextContents();

  const expectElementTextsContains = async() => await locator.page().expect()
    .setName(expectElementTextsContains.name)
    .arrayContains(actual, expected, kwargs).poll();
  const expectElementTextsEquals = async() => await locator.page().expect()
    .setName(expectElementTextsEquals.name)
    .arrayEquals(actual, expected, kwargs).poll();

  switch (context) {
    case MatchContext.CONTAIN:
    case MatchContext.PARTIAL: {
      await expectElementTextsContains();
      break;
    }
    default: {
      await expectElementTextsEquals();
      break;
    }
  }
}

export async function expectElementTextIsEmpty(locator: Locator, kwargs?: ExpectedConditionKwargs) {
  await locator.expect()
    .setName(expectElementTextIsEmpty.name)
    .textEmpty(kwargs).poll();
}
