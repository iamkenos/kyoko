import { DataTable, Then, When } from "@cucumber/cucumber";
import {
  AnchorAttributes,
  Axis,
  ClickAction,
  HrefScheme,
  HrefSchemeContext,
  HrefTarget,
  HrefTargetContext,
  SelectAction,
  SelectOptionContext,
  SetValueAction,
  SizeContext
} from "./enums";
import { XPathBuilder } from "../utils/xpath-builder";

import type { This } from "../world";
import type { Locator } from "@commands/locator/types";

When(
  /^I clear the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" (?:field|element)$/,
  async function(this: This, page: string, index: number, element: string) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.clear();
  }
);

When(
  /^I (?:(double|force|middle|right) )?click the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" (?:(?:element|button)|(link))(?: (\d+) (?:times))?(?: again)?$/,
  async function(this: This, action: ClickAction, page: string, index: number, element: string, link: boolean, count: number) {
    const selector = link ? new XPathBuilder().textEquals(element).hasExactAttribute(AnchorAttributes.HREF).build() : element;
    const locator = this.findPageObjectLocator(page, selector, index);
    const clickCount = count || 1;
    switch (action) {
      case ClickAction.FORCE: {
        await locator.click({ clickCount, force: true });
        break;
      }
      case ClickAction.DOUBLE: {
        await locator.dblclick();
        break;
      }
      case ClickAction.MIDDLE: {
        await locator.click({ button: ClickAction.MIDDLE, clickCount });
        break;
      }
      case ClickAction.RIGHT: {
        await locator.click({ button: ClickAction.RIGHT, clickCount });
        break;
      }
      default: {
        await locator.click({ clickCount });
        break;
      }
    }
  }
);

When(
  /^I drag the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" element to the(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" element$/,
  async function(this: This, page: string, sourceIndex: number, sourceElement: string, targetIndex: number, targetElement: string) {
    const sourceLocator = this.findPageObjectLocator(page, sourceElement, sourceIndex);
    const targetLocator = this.findPageObjectLocator(page, targetElement, targetIndex);
    await sourceLocator.dragAndDrop(targetLocator);
  }
);

async function whenTypeOnField(locator: Locator, value: string, action: SetValueAction) {
  switch (action) {
    case SetValueAction.APPEND: {
      await locator.fill(value, { append: true });
      break;
    }
    default: {
      await locator.fill(value);
      break;
    }
  }
}

When(
  /^I (type|append) "([^"]*)?" on the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" (?:field|element)$/,
  async function(this: This, action: SetValueAction, value: string, page: string, index: number, element: string) {
    const locator = this.findPageObjectLocator(page, element, index);
    await whenTypeOnField(locator, value, action);
  }
);

When(
  /^I (type|append) a multi line value on the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" (?:field|element):$/,
  async function(this: This, action: SetValueAction, page: string, index: number, element: string, value: string) {
    const locator = this.findPageObjectLocator(page, element, index);
    await whenTypeOnField(locator, value, action);
  }
);

When(
  /^I (type|append) on the(?: "([^"]*)?" (?:page|component)'s)? (?:fields|elements):$/,
  async function(this: This, action: SetValueAction, page: string, table: DataTable) {
    const values = table.raw().slice(1).map(([element, value, index]) => ({ locator: this.findPageObjectLocator(page, element, +index), value }));
    for (let i = 0; i < values.length; i++) {
      const { locator, value } = values[i];
      await whenTypeOnField(locator, value, action);
    }
  }
);

When(
  /^I focus on the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" (?:field|element)$/,
  async function(this: This, page: string, index: number, element: string) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.focus();
  }
);

When(
  /^I hover on the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" element(?: with an offset of (\d+),(\d+))?$/,
  async function(this: This, page: string, index: number, element: string, x: number, y: number) {
    const locator = this.findPageObjectLocator(page, element, index);
    const position = x !== null ? { x, y } : undefined;
    await locator.hoverIntoView({ position });
  }
);

When(
  /^I scroll to the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" element$/,
  async function(this: This, page: string, index: number, element: string) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.scrollIntoView();
  }
);

When(
  /^I (select|deselect) the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" (?:element|option|check box|toggle item|radio button)$/,
  async function(this: This, action: SelectAction, page: string, index: number, element: string) {
    const locator = this.findPageObjectLocator(page, element, index);
    action === SelectAction.SELECT ? await locator.check({ force: true }) : await locator.uncheck({ force: true });
  }
);

When(
  /^I select the(?: (\d+)(?:st|nd|rd|th))? option(?: with (label|value) "([^"]*)?")? from the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" dropdown$/,
  async function(this: This, optIndex: number, context: SelectOptionContext, option: string, page: string, index: number, element: string) {
    const locator = this.findPageObjectLocator(page, element, index);
    switch (context) {
      case SelectOptionContext.LABEL: {
        await locator.selectOption({ label: option }, { force: true });
        break;
      }
      case SelectOptionContext.VALUE: {
        await locator.selectOption({ value: option }, { force: true });
        break;
      }
      default: {
        await locator.selectOption({ index: optIndex - 1 }, { force: true });
        break;
      }
    }
  }
);

When(
  /^I select the options from the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" multi select dropdown:$/,
  async function(this: This, page: string, index: number, element: string, table: DataTable) {
    const locator = this.findPageObjectLocator(page, element, index);
    const values = table.raw().slice(1).map(([context, value]) => ({ [context]: context === "index" ? +value : value }));
    await locator.selectOption(values, { force: true });
  }
);

When(
  /^I upload the "([^"]*)?" file to the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" (?:field|element)$/,
  async function(this: This, filepath: string, page: string, index: number, element: string) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.uploadFiles(filepath);
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)? "([^"]*)?" elements text array to( not)? contain:$/,
  async function(this: This, page: string, element: string, not: boolean, values: DataTable) {
    const locator = this.findPageObjectLocator(page, element);
    const actual = await locator.allTextContents();
    const expected = [].concat(...values.rows());
    await locator.page().expect().arrayContains(actual, expected, !not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)? "([^"]*)?" elements text array to( not)? be:$/,
  async function(this: This, page: string, element: string, not: boolean, values: DataTable) {
    const locator = this.findPageObjectLocator(page, element);
    const actual = await locator.allTextContents();
    const expected = [].concat(...values.rows());
    await locator.page().expect().arrayEquals(actual, expected, !not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" (?:field|element) "([^"]*)?" attribute to( not)? contain "([^"]*)?"$/,
  async function(this: This, page: string, index: number, element: string, attribute: string, not: boolean, expected: string) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.expect().attributeContains(attribute, expected, !not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" (?:field|element) "([^"]*)?" attribute to( not)? be "([^"]*)?"$/,
  async function(this: This, page: string, index: number, element: string, attribute: string, not: boolean, expected: string) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.expect().attributeEquals(attribute, expected, !not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" (?:(?:element)|(link)) to( not)? open (?:on (?:a|the)? )?(new window|same frame|parent frame|top frame|without a target)$/,
  async function(this: This, page: string, index: number, element: string, link: boolean, not: boolean, target: HrefTargetContext) {
    const selector = link ? new XPathBuilder().textEquals(element).hasExactAttribute(AnchorAttributes.HREF).build() : element;
    const locator = this.findPageObjectLocator(page, selector, index);

    switch (target) {
      case HrefTargetContext.BLANK:
      case HrefTargetContext.SELF:
      case HrefTargetContext.PARENT:
      case HrefTargetContext.TOP: {
        const [context] = Object.entries(HrefTargetContext).find(([, value]) => value === target);
        const expected = HrefTarget[context];
        await locator.expect().attributeEquals(AnchorAttributes.TARGET, expected, !not).poll();
        break;
      }
      default: {
        await locator.expect().attributeExists(AnchorAttributes.TARGET, not).poll();
        break;
      }
    }
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" (?:(?:element)|(link)) to( not)? open on a named frame "([^"]*)?"$/,
  async function(this: This, page: string, index: number, element: string, link: boolean, not: boolean, target: string) {
    const selector = link ? new XPathBuilder().textEquals(element).hasExactAttribute(AnchorAttributes.HREF).build() : element;
    const locator = this.findPageObjectLocator(page, selector, index);
    await locator.expect().attributeEquals(AnchorAttributes.TARGET, target, !not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" (?:(?:element)|(link)) to( not)? point (?:to (?:a|an)? |to )?(?:(path|section|absolute url|mail|tel)? )?"([^"]*)?"$/,
  async function(this: This, page: string, index: number, element: string, link: boolean, not: boolean, scheme: HrefSchemeContext, value: string) {
    const selector = link ? new XPathBuilder().textEquals(element).hasExactAttribute(AnchorAttributes.HREF).build() : element;
    const locator = this.findPageObjectLocator(page, selector, index);

    switch (scheme) {
      case HrefSchemeContext.MAIL:
      case HrefSchemeContext.TEL: {
        const [context] = Object.entries(HrefSchemeContext).find(([, value]) => value === scheme);
        const expected = `${HrefScheme[context]}${value}`;
        await locator.expect().attributeEquals(AnchorAttributes.HREF, expected, !not).poll();
        break;
      }
      default: {
        await locator.expect().attributeEquals(AnchorAttributes.HREF, value, !not).poll();
        break;
      }
    }
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" (?:(?:element)|(link)) to( not)? point to the "([^"]*)?" page$/,
  async function(this: This, page: string, index: number, element: string, link: boolean, not: boolean, target: string) {
    const selector = link ? new XPathBuilder().textEquals(element).hasExactAttribute(AnchorAttributes.HREF).build() : element;
    const locator = this.findPageObjectLocator(page, selector, index);
    const expected = this.findPageObject(target).url;
    await locator.expect().attributeEquals(AnchorAttributes.HREF, expected, !not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" (?:field|element) "([^"]*)?" attribute to( not)? exist$/,
  async function(this: This, page: string, index: number, element: string, expected: string, not: boolean) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.expect().attributeExists(expected, !not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" element location at (x|y) axis to( not)? be (\d*\.?\d+)$/,
  async function(this: This, page: string, index: number, element: string, axis: Axis, not: boolean, expected: number) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.expect().axisLocationEquals(axis, expected, !not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" (?:element|option|check box|toggle item|radio button) to( not)? be (?:checked|selected)$/,
  async function(this: This, page: string, index: number, element: string, not: boolean) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.expect().checked(!not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" element count to( not)? be (\d+)$/,
  async function(this: This, page: string, index: number, element: string, not: boolean, expected: number) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.expect().countEquals(expected, !not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" element count to( not)? be less than (\d+)$/,
  async function(this: This, page: string, index: number, element: string, not: boolean, expected: number) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.expect().countLessThan(expected, !not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" element count to( not)? be more than (\d+)$/,
  async function(this: This, page: string, index: number, element: string, not: boolean, expected: number) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.expect().countMoreThan(expected, !not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" (?:field|element) "([^"]*)?" css property to( not)? exist$/,
  async function(this: This, page: string, index: number, element: string, expected: string, not: boolean) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.expect().cssPropertyExists(expected, !not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" element to( not)? be (\d*\.?\d+)px in width and (\d*\.?\d+)px in height$/,
  async function(this: This, page: string, index: number, element: string, not: boolean, width: number, height: number) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.expect().dimensionEquals(width, height, !not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" element to( not)? be (\d*\.?\d+)px in (width|height)$/,
  async function(this: This, page: string, index: number, element: string, not: boolean, expected: number, side: SizeContext) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.expect().dimensionSideEquals(side, expected, !not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" element to( not)? be displayed$/,
  async function(this: This, page: string, index: number, element: string, not: boolean) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.expect().displayed(!not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" element to( not)? be displayed within the viewport$/,
  async function(this: This, page: string, index: number, element: string, not: boolean) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.expect().displayedInViewport(!not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" element to( not)? be enabled$/,
  async function(this: This, page: string, index: number, element: string, not: boolean) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.expect().enabled(!not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" element to( not)? exist$/,
  async function(this: This, page: string, index: number, element: string, not: boolean) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.expect().exists(!not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" element to( not)? be focused$/,
  async function(this: This, page: string, index: number, element: string, not: boolean) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.expect().focused(!not).poll();
  }
);

Then(
  /^I expect the(?: (\d+)(?:st|nd|rd|th))? option(?: with (label|value) "([^"]*)?")? from the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" dropdown to( not)? be selected$/,
  async function(this: This, optIndex: number, context: SelectOptionContext, expected: string, page: string, index: number, element: string, not: boolean) {
    const locator = this.findPageObjectLocator(page, element, index);
    const options = await locator.dropdownOptions();

    switch (context) {
      case SelectOptionContext.LABEL: {
        await options.find(i => i.label === expected).locator.expect().selected(!not).poll();
        break;
      }
      case SelectOptionContext.VALUE: {
        await options.find(i => i.value === expected).locator.expect().selected(!not).poll();
        break;
      }
      default: {
        await options.find(i => i.index === optIndex - 1).locator.expect().selected(!not).poll();
        break;
      }
    }
  }
);

Then(
  /^I expect the options from the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" multi select dropdown to( not)? be selected:$/,
  async function(this: This, page: string, index: number, element: string, not: boolean, table: DataTable) {
    const locator = this.findPageObjectLocator(page, element, index);
    const options = await locator.dropdownOptions();
    const values = table.raw().slice(1).map(([context, value]) => ({ context, value: context === "index" ? +value : value }));

    for (let i = 0; i < values.length; i++) {
      const { context, value: expected } = values[i];
      switch (context) {
        case SelectOptionContext.LABEL: {
          await options.find(i => i.label === expected).locator.expect().selected(!not).poll();
          break;
        }
        case SelectOptionContext.VALUE: {
          await options.find(i => i.value === expected).locator.expect().selected(!not).poll();
          break;
        }
        default: {
          await options.find(i => i.index === expected).locator.expect().selected(!not).poll();
          break;
        }
      }
    }
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" element to( not)? match the snapshot "([^"]*)?"$/,
  async function(this: This, page: string, index: number, element: string, not: boolean, filename: string) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.expect().snapshotMatch(filename, undefined, !not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" element text to( not)? contain "([^"]*)?"$/,
  async function(this: This, page: string, index: number, element: string, not: boolean, expected: string) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.expect().textContains(expected, !not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" element text to( not)? contain:$/,
  async function(this: This, page: string, index: number, element: string, not: boolean, expected: string) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.expect().textContains(expected, !not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" element text to( not)? be empty$/,
  async function(this: This, page: string, index: number, element: string, not: boolean) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.expect().textEmpty(!not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" element text to( not)? be "([^"]*)?"$/,
  async function(this: This, page: string, index: number, element: string, not: boolean, expected: string) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.expect().textEquals(expected, !not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" element text to( not)? be:$/,
  async function(this: This, page: string, index: number, element: string, not: boolean, expected: string) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.expect().textEquals(expected, !not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" (?:field|element) value to( not)? contain "([^"]*)?"$/,
  async function(this: This, page: string, index: number, element: string, not: boolean, expected: string) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.expect().valueContains(expected, !not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" (?:field|element) value to( not)? contain:$/,
  async function(this: This, page: string, index: number, element: string, not: boolean, expected: string) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.expect().valueContains(expected, !not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" (?:field|element) value to( not)? be empty$/,
  async function(this: This, page: string, index: number, element: string, not: boolean) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.expect().valueEmpty(!not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" (?:field|element) value to( not)? be "([^"]*)?"$/,
  async function(this: This, page: string, index: number, element: string, not: boolean, expected: string) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.expect().valueEquals(expected, !not).poll();
  }
);

Then(
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" (?:field|element) value to( not)? be:$/,
  async function(this: This, page: string, index: number, element: string, not: boolean, expected: string) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.expect().valueEquals(expected, !not).poll();
  }
);
