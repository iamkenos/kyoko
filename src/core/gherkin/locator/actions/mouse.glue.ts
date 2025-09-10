
import { ClickAction } from "@core/gherkin/enums";

import type { Locator } from "playwright";
import type { WebComponent } from "@core/fixtures/web-component.fixture";

export async function click(locator: Locator | WebComponent, action?: ClickAction, clickCount?: number) {
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

export async function dragAndDrop(source: Locator | WebComponent, target: Locator | WebComponent) {
  await source.dragAndDrop(target);
}

export async function focus(locator: Locator | WebComponent) {
  await locator.focus();
}

export async function hoverIntoView(locator: Locator | WebComponent, options?: Parameters<Locator["hoverIntoView"]>[0]) {
  await locator.hoverIntoView(options);
}

export async function scrollIntoView(locator: Locator | WebComponent) {
  await locator.scrollIntoView();
}

