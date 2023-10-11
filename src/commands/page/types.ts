import type { Page as PlaywrightPageType, Request } from "@playwright/test";
import type { BrowserContext } from "@commands/context/types";
import type { FrameLocator } from "@commands/frame/types";
import type { Page as PageClassType } from "./page";
import type { dialogListener } from "./command/dialog-listener";
import type { downloadFile } from "./command/download-file";
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
import type { requestsInterceptor } from "./command/requests-interceptor";
import type { scrollTo } from "./command/scroll-to";
import type { scrollToBottom } from "./command/scroll-to-bottom";
import type { scrollToTop } from "./command/scroll-to-top";
import type { switchToFrame } from "./command/switch-to-frame";

// @ts-ignore
export interface Page extends PlaywrightPageType, PageClassType {
  context: () => BrowserContext;
  activeframe: FrameLocator;
  dialog: { handled: boolean, message: string };
  dialogListener: typeof dialogListener;
  downloadFile: typeof downloadFile;
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
  requestsInterceptor: typeof requestsInterceptor;
  scrollTo: typeof scrollTo;
  scrollToBottom: typeof scrollToBottom;
  scrollToTop: typeof scrollToTop;
  switchToFrame: typeof switchToFrame;
}
