import type { Locator as BasePlaywrightLocator } from "@playwright/test";
import type { Page } from "@fixtures/page/types";
import type { Locator as LocatorClass } from "./locator";
import type { all } from "./commands/all";
import type { and } from "./commands/and";
import type { centerPoint } from "./commands/center-point";
import type { clickUntil } from "./commands/click-until";
import type { component } from "./commands/component";
import type { doUntil } from "./commands/do-until";
import type { dragAndDrop } from "./commands/drag-and-drop";
import type { dropdownOptions } from "./commands/dropdown-options";
import type { expect } from "./commands/expect";
import type { fill } from "./commands/fill";
import type { first } from "./commands/first";
import type { getByAltText } from "./commands/get-by-alt-text";
import type { getByLabel } from "./commands/get-by-label";
import type { getByPlaceholder } from "./commands/get-by-placeholder";
import type { getByRole } from "./commands/get-by-role";
import type { getByTestId } from "./commands/get-by-test-id";
import type { getByText } from "./commands/get-by-text";
import type { getByTitle } from "./commands/get-by-title";
import type { given } from "./commands/given";
import type { hoverIntoView } from "./commands/hover-into-view";
import type { isFocused } from "./commands/is-focused";
import type { isSelected } from "./commands/is-selected";
import type { last } from "./commands/last";
import type { location } from "./commands/location";
import type { locator } from "./commands/locator";
import type { nth } from "./commands/nth";
import type { or } from "./commands/or";
import type { press } from "./commands/press";
import type { scrollIntoView } from "./commands/scroll-into-view";
import type { selectOption } from "./commands/select-option";
import type { uploadFiles } from "./commands/upload-files";

export interface PlaywrightLocator extends BasePlaywrightLocator {
  _selector: string;
}

export interface Locator extends PlaywrightLocator, LocatorClass {
  all(...args: Parameters<typeof all>): ReturnType<typeof all>;
  and(...args: Parameters<typeof and>): ReturnType<typeof and>;
  centerPoint(...args: Parameters<typeof centerPoint>): ReturnType<typeof centerPoint>;
  clickUntil(...args: Parameters<typeof clickUntil>): ReturnType<typeof clickUntil>;
  component<T>(...args: Parameters<typeof component<T>>): ReturnType<typeof component<T>>;
  doUntil(...args: Parameters<typeof doUntil>): ReturnType<typeof doUntil>;
  dragAndDrop(...args: Parameters<typeof dragAndDrop>): ReturnType<typeof dragAndDrop>;
  dropdownOptions(...args: Parameters<typeof dropdownOptions>): ReturnType<typeof dropdownOptions>;
  expect(...args: Parameters<typeof expect>): ReturnType<typeof expect>;
  fill(...args: Parameters<typeof fill>): ReturnType<typeof fill>;
  first(...args: Parameters<typeof first>): ReturnType<typeof first>;
  getByAltText(...args: Parameters<typeof getByAltText>): ReturnType<typeof getByAltText>;
  getByLabel(...args: Parameters<typeof getByLabel>): ReturnType<typeof getByLabel>;
  getByPlaceholder(...args: Parameters<typeof getByPlaceholder>): ReturnType<typeof getByPlaceholder>;
  getByRole(...args: Parameters<typeof getByRole>): ReturnType<typeof getByRole>;
  getByTestId(...args: Parameters<typeof getByTestId>): ReturnType<typeof getByTestId>;
  getByText(...args: Parameters<typeof getByText>): ReturnType<typeof getByText>;
  getByTitle(...args: Parameters<typeof getByTitle>): ReturnType<typeof getByTitle>;
  given(...args: Parameters<typeof given>): ReturnType<typeof given>;
  hoverIntoView(...args: Parameters<typeof hoverIntoView>): ReturnType<typeof hoverIntoView>;
  isFocused(...args: Parameters<typeof isFocused>): ReturnType<typeof isFocused>;
  isSelected(...args: Parameters<typeof isSelected>): ReturnType<typeof isSelected>;
  last(...args: Parameters<typeof last>): ReturnType<typeof last>;
  location(...args: Parameters<typeof location>): ReturnType<typeof location>;
  locator(...args: Parameters<typeof locator>): ReturnType<typeof locator>;
  page(): Page;
  nth(...args: Parameters<typeof nth>): ReturnType<typeof nth>;
  or(...args: Parameters<typeof or>): ReturnType<typeof or>;
  press(...args: Parameters<typeof press>): ReturnType<typeof press>;
  scrollIntoView(...args: Parameters<typeof scrollIntoView>): ReturnType<typeof scrollIntoView>;
  selectOption(...args: Parameters<typeof selectOption>): ReturnType<typeof selectOption>;
  uploadFiles(...args: Parameters<typeof uploadFiles>): ReturnType<typeof uploadFiles>;
}

export type LocatorFilters = Parameters<Locator["locator"]>[1];
