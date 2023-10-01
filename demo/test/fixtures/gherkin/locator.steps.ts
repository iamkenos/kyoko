import { DataTable, Then, When } from "@cucumber/cucumber";

import { Locator, BaseWorld as This } from "@generics";

export enum ClickAction {
  LEFT = "left",
  MIDDLE = "middle",
  RIGHT = "right",
  SCRIPT = "script",
  DOUBLE = "double"
}

export enum SelectAction {
  SELECT = "select",
  DESELECT = "deselect"
}

export enum SelectOptionContext {
  LABEL = "label",
  VALUE = "value",
  INDEX = "index",
}

export enum SetValueAction {
  TYPE = "type",
  APPEND = "append"
}

export enum SizeContext {
  WIDTH = "width",
  HEIGHT = "height"
}

export enum Axis {
  X = "x",
  Y = "y"
}

When(
  /^I clear the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" (?:field|element)$/,
  async function(this: This, page: string, index: number, element: string) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.clear();
  }
);

When(
  /^I (?:(double|script|middle|right) )?click the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" (?:link|button|element)(?: (\d+) (?:times))?(?: again)?$/,
  async function(this: This, action: ClickAction, page: string, index: number, element: string, count: number) {
    const locator = this.findPageObjectLocator(page, element, index);
    const clickCount = count || 1;
    switch (action) {
      case ClickAction.SCRIPT: {
        await locator.jsClick();
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
    const conditions = locator.expect().checked(action === SelectAction.SELECT);
    await locator.clickUntil(conditions, { force: true });
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

async function whenTypeOnField(locator: Locator, value: string, action: SetValueAction) {
  switch (action) {
    case SetValueAction.APPEND: {
      const current = await locator.inputValue();
      await locator.fill(current + value);
      break;
    }
    default: {
      await locator.clear();
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
  /^I upload the "([^"]*)?" file to the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" (?:field|element)$/,
  async function(this: This, filepath: string, page: string, index: number, element: string) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.uploadFiles(filepath);
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
  /^I expect the(?: "([^"]*)?" (?:page|component)'s)?(?: (\d+)(?:st|nd|rd|th))? "([^"]*)?" (?:element|option|check box|toggle item|radio button) to( not)? be (?:checked|selected)$/,
  async function(this: This, page: string, index: number, element: string, not: boolean) {
    const locator = this.findPageObjectLocator(page, element, index);
    await locator.expect().checked(!not).poll();
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
