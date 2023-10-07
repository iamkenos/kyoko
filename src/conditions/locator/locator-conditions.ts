import { ExpectedConditions } from "../expected-conditions";
import { AttributeContains } from "./condition/attribute-contains";
import { AttributeEquals } from "./condition/attribute-equals";
import { AttributeExists } from "./condition/attribute-exists";
import { AxisLocationEquals } from "./condition/axis-location-equals";
import { Checked } from "./condition/checked";
import { CssPropertyExists } from "./condition/css-property-exists";
import { DimensionEquals } from "./condition/dimension-equals";
import { DimensionSideEquals } from "./condition/dimension-side-equals";
import { Displayed } from "./condition/displayed";
import { DisplayedInViewport } from "./condition/displayed-in-viewport";
import { Enabled } from "./condition/enabled";
import { Exists } from "./condition/exists";
import { Focused } from "./condition/focused";
import { Selected } from "./condition/selected";
import { SnapshotMatch } from "./condition/snapshot-match";
import { TextContains } from "./condition/text-contains";
import { TextEquals } from "./condition/text-equals";
import { ValueContains } from "./condition/value-contains";
import { ValueEquals } from "./condition/value-equals";

import type { Locator } from "@commands/locator/types";
import type { LocatorSnapshotOptions } from "@config/types";
import type { Axis, SizeContext } from "@core/gherkin/enums";
import type { ExpectedConditionOptions } from "../types";

export class LocatorConditions extends ExpectedConditions {
  protected locator: Locator;

  constructor(locator: Locator, options?: ExpectedConditionOptions) {
    super(options);
    this.name = this.name + `\n  With: ${locator}`;
    this.locator = locator;
  }

  attributeContains(attribute: string, expected: string, preferred?: boolean) {
    return this.addCondition(new AttributeContains(attribute, expected, preferred));
  }

  attributeEquals(attribute: string, expected: string, preferred?: boolean) {
    return this.addCondition(new AttributeEquals(attribute, expected, preferred));
  }

  attributeExists(attribute: string, preferred?: boolean) {
    return this.addCondition(new AttributeExists(attribute, preferred));
  }

  axisLocationEquals(axis: Axis, expected: number, preferred?: boolean) {
    return this.addCondition(new AxisLocationEquals(axis, expected, preferred));
  }

  checked(preferred?: boolean) {
    return this.addCondition(new Checked(preferred));
  }

  cssPropertyExists(property: string, preferred?: boolean) {
    return this.addCondition(new CssPropertyExists(property, preferred));
  }

  dimensionEquals(width: number, height: number, preferred?: boolean) {
    return this.addCondition(new DimensionEquals(width, height, preferred));
  }

  dimensionSideEquals(side: SizeContext, expected: number, preferred?: boolean) {
    return this.addCondition(new DimensionSideEquals(side, expected, preferred));
  }

  displayed(preferred?: boolean) {
    return this.addCondition(new Displayed(preferred));
  }

  displayedInViewport(preferred?: boolean) {
    return this.addCondition(new DisplayedInViewport(preferred));
  }

  enabled(preferred?: boolean) {
    return this.addCondition(new Enabled(preferred));
  }

  exists(preferred?: boolean) {
    return this.addCondition(new Exists(preferred));
  }

  focused(preferred?: boolean) {
    return this.addCondition(new Focused(preferred));
  }

  selected(preferred?: boolean) {
    return this.addCondition(new Selected(preferred));
  }

  snapshotMatch(filename: string, options?: LocatorSnapshotOptions, preferred?: boolean) {
    return this.addCondition(new SnapshotMatch(filename, options, preferred));
  }

  textContains(expected: string, preferred?: boolean) {
    return this.addCondition(new TextContains(expected, preferred));
  }

  textEmpty(preferred?: boolean) {
    return this.addCondition(new TextEquals(undefined, preferred));
  }

  textEquals(expected: string, preferred?: boolean) {
    return this.addCondition(new TextEquals(expected, preferred));
  }

  valueContains(expected: string, preferred?: boolean) {
    return this.addCondition(new ValueContains(expected, preferred));
  }

  valueEmpty(preferred?: boolean) {
    return this.addCondition(new ValueEquals(undefined, preferred));
  }

  valueEquals(expected: string, preferred?: boolean) {
    return this.addCondition(new ValueEquals(expected, preferred));
  }
}
