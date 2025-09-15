
import { ClickAction } from "@plugins/gherkin/enums";

import type { Locator } from "playwright";

export async function click(locator: Locator, action?: ClickAction, clickCount?: number) {
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

export async function dragAndDrop(source: Locator, target: Locator) {
  await source.dragAndDrop(target);
}

export async function focus(locator: Locator) {
  await locator.focus();
}

export async function hoverIntoView(locator: Locator, options?: Parameters<Locator["hoverIntoView"]>[0]) {
  await locator.hoverIntoView(options);
}

export async function scrollIntoView(locator: Locator) {
  await locator.scrollIntoView();
}

