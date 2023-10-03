import type { ExpectedConditionOptions } from "../types";
import type { Locator } from "@commands/locator/types";

import { LocatorSnapshotOptions } from "@generics";
import { Axis, SizeContext } from "@gherkin";
import { ExpectedConditions } from "../expected-conditions";
import { AttributeContains } from "./attribute-contains";
import { AttributeEquals } from "./attribute-equals";
import { AttributeExists } from "./attribute-exists";
import { AxisLocationEquals } from "./axis-location-equals";
import { Checked } from "./checked";
import { CssPropertyExists } from "./css-property-exists";
import { DimensionEquals } from "./dimension-equals";
import { DimensionSideEquals } from "./dimension-side-equals";
import { Displayed } from "./displayed";
import { DisplayedInViewport } from "./displayed-in-viewport";
import { Enabled } from "./enabled";
import { Exists } from "./exists";
import { Selected } from "./selected";
import { SnapshotMatch } from "./snapshot-match";
import { TextContains } from "./text-contains";
import { TextEquals } from "./text-equals";
import { ValueContains } from "./value-contains";
import { ValueEquals } from "./value-equals";

export class LocatorConditions extends ExpectedConditions {
  private readonly locator: Locator;

  constructor(locator: Locator, options?: ExpectedConditionOptions) {
    super(options);
    this.locator = locator;
  }

  attributeContains(attribute: string, expected: string, preferred?: boolean) {
    return this.addCondition(new AttributeContains(attribute, expected, preferred).setLocator(this.locator));
  }

  attributeEquals(attribute: string, expected: string, preferred?: boolean) {
    return this.addCondition(new AttributeEquals(attribute, expected, preferred).setLocator(this.locator));
  }

  attributeExists(attribute: string, preferred?: boolean) {
    return this.addCondition(new AttributeExists(attribute, preferred).setLocator(this.locator));
  }

  axisLocationEquals(axis: Axis, expected: number, preferred?: boolean) {
    return this.addCondition(new AxisLocationEquals(axis, expected, preferred).setLocator(this.locator));
  }

  checked(preferred?: boolean) {
    return this.addCondition(new Checked(preferred).setLocator(this.locator));
  }

  cssPropertyExists(property: string, preferred?: boolean) {
    return this.addCondition(new CssPropertyExists(property, preferred).setLocator(this.locator));
  }

  dimensionEquals(width: number, height: number, preferred?: boolean) {
    return this.addCondition(new DimensionEquals(width, height, preferred).setLocator(this.locator));
  }

  dimensionSideEquals(side: SizeContext, expected: number, preferred?: boolean) {
    return this.addCondition(new DimensionSideEquals(side, expected, preferred).setLocator(this.locator));
  }

  displayed(preferred?: boolean) {
    return this.addCondition(new Displayed(preferred).setLocator(this.locator));
  }

  displayedInViewport(preferred?: boolean) {
    return this.addCondition(new DisplayedInViewport(preferred).setLocator(this.locator));
  }

  enabled(preferred?: boolean) {
    return this.addCondition(new Enabled(preferred).setLocator(this.locator));
  }

  exists(preferred?: boolean) {
    return this.addCondition(new Exists(preferred).setLocator(this.locator));
  }

  selected(preferred?: boolean) {
    return this.addCondition(new Selected(preferred).setLocator(this.locator));
  }

  snapshotMatch(filename: string, options?: LocatorSnapshotOptions, preferred?: boolean) {
    return this.addCondition(new SnapshotMatch(filename, options, preferred).setLocator(this.locator));
  }

  textContains(expected: string, preferred?: boolean) {
    return this.addCondition(new TextContains(expected, preferred).setLocator(this.locator));
  }

  textEmpty(preferred?: boolean) {
    return this.addCondition(new TextEquals(undefined, preferred).setLocator(this.locator));
  }

  textEquals(expected: string, preferred?: boolean) {
    return this.addCondition(new TextEquals(expected, preferred).setLocator(this.locator));
  }

  valueContains(expected: string, preferred?: boolean) {
    return this.addCondition(new ValueContains(expected, preferred).setLocator(this.locator));
  }

  valueEmpty(preferred?: boolean) {
    return this.addCondition(new ValueEquals(undefined, preferred).setLocator(this.locator));
  }

  valueEquals(expected: string, preferred?: boolean) {
    return this.addCondition(new ValueEquals(expected, preferred).setLocator(this.locator));
  }
}
