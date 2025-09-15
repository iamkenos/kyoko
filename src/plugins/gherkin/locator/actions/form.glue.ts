import {
  SelectOptionContext,
  SetValueAction,
  ToggleAction
} from "@plugins/gherkin/enums";

import type { Locator } from "playwright";

export async function clear(locator: Locator) {
  await locator.clear();
}

export async function fill(locator: Locator, value: string, action: SetValueAction) {
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

export async function toggle(locator: Locator, action: ToggleAction) {
  switch (action) {
    case ToggleAction.TICK: {
      await locator.check({ force: true });
      break;
    }
    default: {
      await locator.uncheck({ force: true });
      break;
    }
  }
}

export async function selectOption(locator: Locator, option: string | number, context: SelectOptionContext) {
  switch (context) {
    case SelectOptionContext.LABEL: {
      await locator.selectOption({ label: option as string }, { force: true });
      break;
    }
    case SelectOptionContext.VALUE: {
      await locator.selectOption({ value: option as string }, { force: true });
      break;
    }
    default: {
      await locator.selectOption({ index: option as number - 1 }, { force: true });
      break;
    }
  }
}

export async function selectOptions(locator: Locator, options: { [key: string]: string | number }[]) {
  await locator.selectOption(options, { force: true });
}

export async function uploadFiles(locator: Locator, filepath: string) {
  await locator.uploadFiles(filepath);
}
