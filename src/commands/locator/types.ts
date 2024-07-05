import type { Locator as PlaywrightLocatorType } from "@playwright/test";
import type { Page } from "@commands/page/types";
import type { Locator as LocatorClassType } from "./locator";
import type { all } from "./command/all";
import type { and } from "./command/and";
import type { centerPoint } from "./command/center-point";
import type { clickUntil } from "./command/click-until";
import type { component } from "./command/component";
import type { doUntil } from "./command/do-until";
import type { dragAndDrop } from "./command/drag-and-drop";
import type { dropdownOptions } from "./command/dropdown-options";
import type { expect } from "./command/expect";
import type { fill } from "./command/fill";
import type { first } from "./command/first";
import type { getByAltText } from "./command/get-by-alt-text";
import type { getByLabel } from "./command/get-by-label";
import type { getByPlaceholder } from "./command/get-by-placeholder";
import type { getByRole } from "./command/get-by-role";
import type { getByTestId } from "./command/get-by-test-id";
import type { getByText } from "./command/get-by-text";
import type { getByTitle } from "./command/get-by-title";
import type { given } from "./command/given";
import type { hoverIntoView } from "./command/hover-into-view";
import type { isFocused } from "./command/is-focused";
import type { isSelected } from "./command/is-selected";
import type { last } from "./command/last";
import type { location } from "./command/location";
import type { locator } from "./command/locator";
import type { nth } from "./command/nth";
import type { or } from "./command/or";
import type { press } from "./command/press";
import type { scrollIntoView } from "./command/scroll-into-view";
import type { selectOption } from "./command/select-option";
import type { uploadFiles } from "./command/upload-files";

export interface Locator extends PlaywrightLocatorType, LocatorClassType {
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
