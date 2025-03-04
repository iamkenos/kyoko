import type { Locator as BasePlaywrightLocator } from "@playwright/test";
import type { Page } from "@fixtures/page/types";
import type { Locator as LocatorClass } from "./locator";
import type { AllCommand } from "./commands/all";
import type { AndCommand } from "./commands/and";
import type { CenterPointCommand } from "./commands/center-point";
import type { ClickUntilCommand } from "./commands/click-until";
import type { ComponentCommand } from "./commands/component";
import type { DoUntilCommand } from "./commands/do-until";
import type { DragAndDropCommand } from "./commands/drag-and-drop";
import type { DropdownOptionsCommand } from "./commands/dropdown-options";
import type { ExpectCommand } from "./commands/expect";
import type { FillCommand } from "./commands/fill";
import type { FirstCommand } from "./commands/first";
import type { GetByAltTextCommand } from "./commands/get-by-alt-text";
import type { GetByLabelCommand } from "./commands/get-by-label";
import type { GetByPlaceholderCommand } from "./commands/get-by-placeholder";
import type { GetByRoleCommand } from "./commands/get-by-role";
import type { GetByTestIdCommand } from "./commands/get-by-test-id";
import type { GetByTextCommand } from "./commands/get-by-text";
import type { GetByTitleCommand } from "./commands/get-by-title";
import type { HoverIntoViewCommand } from "./commands/hover-into-view";
import type { IsFocusedCommand } from "./commands/is-focused";
import type { IsSelectedCommand } from "./commands/is-selected";
import type { LastCommand } from "./commands/last";
import type { LocationCommand } from "./commands/location";
import type { LocatorCommand } from "./commands/locator";
import type { NthCommand } from "./commands/nth";
import type { OrCommand } from "./commands/or";
import type { PressCommand } from "./commands/press";
import type { ScrollIntoViewCommand } from "./commands/scroll-into-view";
import type { SelectOptionCommand } from "./commands/select-option";
import type { UploadFilesCommand } from "./commands/upload-files";
import type { WaitUntilCommand } from "./commands/wait-until";

export interface PlaywrightLocator extends BasePlaywrightLocator {
  _selector: string;
}

export interface Locator extends PlaywrightLocator, LocatorClass {
  all(...args: Parameters<AllCommand>): ReturnType<AllCommand>;
  and(...args: Parameters<AndCommand>): ReturnType<AndCommand>;
  centerPoint(...args: Parameters<CenterPointCommand>): ReturnType<CenterPointCommand>;
  clickUntil(...args: Parameters<ClickUntilCommand>): ReturnType<ClickUntilCommand>;
  component<T>(...args: Parameters<ComponentCommand<T>>): ReturnType<ComponentCommand<T>>;
  doUntil(...args: Parameters<DoUntilCommand>): ReturnType<DoUntilCommand>;
  dragAndDrop(...args: Parameters<DragAndDropCommand>): ReturnType<DragAndDropCommand>;
  dropdownOptions(...args: Parameters<DropdownOptionsCommand>): ReturnType<DropdownOptionsCommand>;
  expect(...args: Parameters<ExpectCommand>): ReturnType<ExpectCommand>;
  fill(...args: Parameters<FillCommand>): ReturnType<FillCommand>;
  first(...args: Parameters<FirstCommand>): ReturnType<FirstCommand>;
  getByAltText(...args: Parameters<GetByAltTextCommand>): ReturnType<GetByAltTextCommand>;
  getByLabel(...args: Parameters<GetByLabelCommand>): ReturnType<GetByLabelCommand>;
  getByPlaceholder(...args: Parameters<GetByPlaceholderCommand>): ReturnType<GetByPlaceholderCommand>;
  getByRole(...args: Parameters<GetByRoleCommand>): ReturnType<GetByRoleCommand>;
  getByTestId(...args: Parameters<GetByTestIdCommand>): ReturnType<GetByTestIdCommand>;
  getByText(...args: Parameters<GetByTextCommand>): ReturnType<GetByTextCommand>;
  getByTitle(...args: Parameters<GetByTitleCommand>): ReturnType<GetByTitleCommand>;
  hoverIntoView(...args: Parameters<HoverIntoViewCommand>): ReturnType<HoverIntoViewCommand>;
  isFocused(...args: Parameters<IsFocusedCommand>): ReturnType<IsFocusedCommand>;
  isSelected(...args: Parameters<IsSelectedCommand>): ReturnType<IsSelectedCommand>;
  last(...args: Parameters<LastCommand>): ReturnType<LastCommand>;
  location(...args: Parameters<LocationCommand>): ReturnType<LocationCommand>;
  locator(...args: Parameters<LocatorCommand>): ReturnType<LocatorCommand>;
  page(): Page;
  nth(...args: Parameters<NthCommand>): ReturnType<NthCommand>;
  or(...args: Parameters<OrCommand>): ReturnType<OrCommand>;
  press(...args: Parameters<PressCommand>): ReturnType<PressCommand>;
  scrollIntoView(...args: Parameters<ScrollIntoViewCommand>): ReturnType<ScrollIntoViewCommand>;
  selectOption(...args: Parameters<SelectOptionCommand>): ReturnType<SelectOptionCommand>;
  uploadFiles(...args: Parameters<UploadFilesCommand>): ReturnType<UploadFilesCommand>;
  waitUntil(...args: Parameters<WaitUntilCommand>): ReturnType<WaitUntilCommand>;
}

export type LocatorFilters = Parameters<Locator["locator"]>[1];
