import { ExpectedConditions } from "../expected-conditions";
import { AttributeContains } from "./condition/attribute-contains";
import { AttributeEquals } from "./condition/attribute-equals";
import { AttributeExists } from "./condition/attribute-exists";
import { AxisLocationEquals } from "./condition/axis-location-equals";
import { Checked } from "./condition/checked";
import { CountEquals } from "./condition/count-equals";
import { CountLessThan } from "./condition/count-less-than";
import { CountMoreThan } from "./condition/count-more-than";
import { CssPropertyExists } from "./condition/css-property-exists";
import { DimensionEquals } from "./condition/dimension-equals";
import { DimensionSizeEquals } from "./condition/dimension-size-equals";
import { Displayed } from "./condition/displayed";
import { DisplayedInViewport } from "./condition/displayed-in-viewport";
import { Enabled } from "./condition/enabled";
import { Exists } from "./condition/exists";
import { Focused } from "./condition/focused";
import { Predicate } from "./condition/predicate";
import { Selected } from "./condition/selected";
import { SnapshotMatch } from "./condition/snapshot-match";
import { TextContains } from "./condition/text-contains";
import { TextEquals } from "./condition/text-equals";
import { ValueContains } from "./condition/value-contains";
import { ValueEquals } from "./condition/value-equals";

import type { Locator } from "playwright";
import type { LocatorSnapshotOptions } from "@config/types";
import type { Axis, SizeContext } from "@plugins/gherkin/enums";
import type { ExpectedConditionKwargs, ExpectedConditionOptions } from "../types";

export class LocatorConditions<T extends Locator = Locator> extends ExpectedConditions {
  protected locator: T;

  constructor(locator: T, options?: ExpectedConditionOptions) {
    super(options);
    this.locator = locator;
  }

  attributeContains(attribute: string, expected: string, kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new AttributeContains(attribute, expected, kwargs));
  }

  attributeEquals(attribute: string, expected: string, kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new AttributeEquals(attribute, expected, kwargs));
  }

  attributeExists(attribute: string, kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new AttributeExists(attribute, kwargs));
  }

  axisLocationEquals(axis: Axis, expected: number, kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new AxisLocationEquals(axis, expected, kwargs));
  }

  checked(kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new Checked(kwargs));
  }

  countEquals(expected: number, kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new CountEquals(expected, kwargs));
  }

  countLessThan(expected: number, kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new CountLessThan(expected, kwargs));
  }

  countMoreThan(expected: number, kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new CountMoreThan(expected, kwargs));
  }

  cssPropertyExists(property: string, kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new CssPropertyExists(property, kwargs));
  }

  dimensionEquals(width: number, height: number, kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new DimensionEquals(width, height, kwargs));
  }

  dimensionSideEquals(side: SizeContext, expected: number, kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new DimensionSizeEquals(side, expected, kwargs));
  }

  displayed(kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new Displayed(kwargs));
  }

  displayedInViewport(kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new DisplayedInViewport(kwargs));
  }

  enabled(kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new Enabled(kwargs));
  }

  exists(kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new Exists(kwargs));
  }

  focused(kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new Focused(kwargs));
  }

  predicate(truthy: boolean | (() => Promise<boolean>) | (() => boolean), kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new Predicate(truthy, kwargs));
  }

  selected(kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new Selected(kwargs));
  }

  snapshotMatch(filename: string, kwargs?: ExpectedConditionKwargs & { options?: LocatorSnapshotOptions }) {
    return this.addCondition(new SnapshotMatch(filename, kwargs));
  }

  textContains(expected: string, kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new TextContains(expected, kwargs));
  }

  textEmpty(kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new TextEquals(undefined, kwargs));
  }

  textEquals(expected: string, kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new TextEquals(expected, kwargs));
  }

  valueContains(expected: string, kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new ValueContains(expected, kwargs));
  }

  valueEmpty(kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new ValueEquals(undefined, kwargs));
  }

  valueEquals(expected: string, kwargs?: ExpectedConditionKwargs) {
    return this.addCondition(new ValueEquals(expected, kwargs));
  }
}
