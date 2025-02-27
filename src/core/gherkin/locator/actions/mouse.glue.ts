
import { ClickAction } from "@core/gherkin/enums";

import type { Locator } from "@fixtures/locator/types";
import type { Component } from "@fixtures/component/component";

export async function click(locator: Locator | Component, action?: ClickAction, clickCount?: number) {
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

export async function dragAndDrop(source: Locator | Component, target: Locator | Component) {
  await source.dragAndDrop(target);
}

export async function focus(locator: Locator | Component) {
  await locator.focus();
}

export async function hoverIntoView(locator: Locator | Component, options?: Parameters<Locator["hoverIntoView"]>[0]) {
  await locator.hoverIntoView(options);
}

export async function scrollIntoView(locator: Locator | Component) {
  await locator.scrollIntoView();
}

