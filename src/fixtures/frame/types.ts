import type { FrameLocator as PlaywrightFrameLocator } from "@playwright/test";
import type { FrameLocator as FrameLocatorClass } from "./frame";
import type { FirstCommand } from "./commands/first";
import type { FrameLocatorCommand } from "./commands/frame-locator";
import type { GetByAltTextCommand } from "./commands/get-by-alt-text";
import type { GetByLabelCommand } from "./commands/get-by-label";
import type { GetByRoleCommand } from "./commands/get-by-role";
import type { GetByTestIdCommand } from "./commands/get-by-test-id";
import type { GetByTextCommand } from "./commands/get-by-text";
import type { GetByTitleCommand } from "./commands/get-by-title";
import type { LastCommand } from "./commands/last";
import type { LocatorCommand } from "./commands/locator";
import type { NthCommand } from "./commands/nth";

export interface FrameLocator extends PlaywrightFrameLocator, FrameLocatorClass {
  first(...args: Parameters<FirstCommand>): ReturnType<FirstCommand>;
  frameLocator(...args: Parameters<FrameLocatorCommand>): ReturnType<FrameLocatorCommand>;
  getByAltText(...args: Parameters<GetByAltTextCommand>): ReturnType<GetByAltTextCommand>;
  getByLabel(...args: Parameters<GetByLabelCommand>): ReturnType<GetByLabelCommand>;
  getByRole(...args: Parameters<GetByRoleCommand>): ReturnType<GetByRoleCommand>;
  getByTestId(...args: Parameters<GetByTestIdCommand>): ReturnType<GetByTestIdCommand>;
  getByText(...args: Parameters<GetByTextCommand>): ReturnType<GetByTextCommand>;
  getByTitle(...args: Parameters<GetByTitleCommand>): ReturnType<GetByTitleCommand>;
  last(...args: Parameters<LastCommand>): ReturnType<LastCommand>;
  locator(...args: Parameters<LocatorCommand>): ReturnType<LocatorCommand>;
  nth(...args: Parameters<NthCommand>): ReturnType<NthCommand>;
}
