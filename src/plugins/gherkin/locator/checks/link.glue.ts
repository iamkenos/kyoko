import {
  AnchorAttributes,
  HrefScheme,
  HrefSchemeContext,
  HrefTarget,
  HrefTargetContext
} from "@plugins/gherkin/enums";

import type { Locator } from "playwright";
import type { ExpectedConditionKwargs } from "@plugins/conditions/types";

export async function expectLinkOpensOn(locator: Locator, target: HrefTargetContext, kwargs?: ExpectedConditionKwargs) {
  const [context] = Object.entries(HrefTargetContext).find(([, value]) => value === target);
  const expected = HrefTarget[context];
  await locator.expect()
    .setName(expectLinkOpensOn.name)
    .attributeEquals(AnchorAttributes.TARGET, expected, kwargs).poll();
}

export async function expectLinkOpensOnTheSameWindow(locator: Locator, kwargs?: ExpectedConditionKwargs) {
  const kwargz = { ...(kwargs || {}), not: !kwargs?.not };
  await locator.expect()
    .setName(expectLinkOpensOnTheSameWindow.name)
    .attributeExists(AnchorAttributes.TARGET, kwargz).poll();
}

export async function expectLinkOpensOnTheNamedFrame(locator: Locator, expected: string, kwargs?: ExpectedConditionKwargs) {
  await locator.expect()
    .setName(expectLinkOpensOnTheNamedFrame.name)
    .attributeEquals(AnchorAttributes.TARGET, expected, kwargs).poll();
}

export async function expectLinkSchemeEquals(locator: Locator, value: string, scheme: HrefSchemeContext, kwargs?: ExpectedConditionKwargs) {
  const [context] = Object.entries(HrefSchemeContext).find(([, value]) => value === scheme);
  const expected = `${HrefScheme[context]}${value}`;
  await locator.expect()
    .setName(expectLinkSchemeEquals.name)
    .attributeEquals(AnchorAttributes.HREF, expected, kwargs).poll();
}

export async function expectLinkHrefEquals(locator: Locator, value: string, kwargs?: ExpectedConditionKwargs) {
  await locator.expect()
    .setName(expectLinkHrefEquals.name)
    .attributeEquals(AnchorAttributes.HREF, value, kwargs).poll();
}
