import type { Page as PlaywrightPageType } from "@playwright/test";
import type { BrowserContext } from "@commands/browsercontext/types";
import type { Page as PageClassType } from "./page";
import type { expect } from "./command/expect";
import type { frameLocator } from "./command/frameLocator";
import type { getByAltText } from "./command/getByAltText";
import type { getByLabel } from "./command/getByLabel";
import type { getByPlaceholder } from "./command/getByPlaceholder";
import type { getByRole } from "./command/getByRole";
import type { getByTestId } from "./command/getByTestId";
import type { getByText } from "./command/getByText";
import type { getByTitle } from "./command/getByTitle";
import type { given } from "./command/given";
import type { locator } from "./command/locator";
import type { scrollTo } from "./command/scrollTo";
import type { scrollToBottom } from "./command/scrollToBottom";
import type { scrollToTop } from "./command/scrollToTop";

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
