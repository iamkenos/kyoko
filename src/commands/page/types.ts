import type { Page as PlaywrightPageType } from "@playwright/test";
import type { BrowserContext } from "@commands/context/types";
import type { Page as PageClassType } from "./page";
import type { expect } from "./command/expect";
import type { frameLocator } from "./command/frame-locator";
import type { getByAltText } from "./command/get-by-alt-text";
import type { getByLabel } from "./command/get-by-label";
import type { getByPlaceholder } from "./command/get-by-placeholder";
import type { getByRole } from "./command/get-by-role";
import type { getByTestId } from "./command/get-by-test-id";
import type { getByText } from "./command/get-by-text";
import type { getByTitle } from "./command/get-by-title";
import type { given } from "./command/given";
import type { locator } from "./command/locator";
import type { scrollTo } from "./command/scroll-to";
import type { scrollToBottom } from "./command/scroll-to-bottom";
import type { scrollToTop } from "./command/scroll-to-top";

// @ts-ignore
export interface Page extends PlaywrightPageType, PageClassType {
  context: () => BrowserContext;
  expect: typeof expect;
  frameLocator: typeof frameLocator;
  getByAltText: typeof getByAltText;
  getByLabel: typeof getByLabel;
  getByPlaceholder: typeof getByPlaceholder;
  getByRole: typeof getByRole;
  getByTestId: typeof getByTestId;
  getByText: typeof getByText;
  getByTitle: typeof getByTitle;
  given: typeof given;
  locator: typeof locator;
  scrollTo: typeof scrollTo;
  scrollToBottom: typeof scrollToBottom;
  scrollToTop: typeof scrollToTop;
}
