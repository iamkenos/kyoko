import type { FrameLocator as PlaywrightFrameLocatorType } from "@playwright/test";
import type { FrameLocator as FrameLocatorClassType } from "./frame";
import type { first } from "./command/first";
import type { frameLocator } from "./command/frame-locator";
import type { getByAltText } from "./command/get-by-alt-text";
import type { getByLabel } from "./command/get-by-label";
import type { getByRole } from "./command/get-by-role";
import type { getByTestId } from "./command/get-by-test-id";
import type { getByText } from "./command/get-by-text";
import type { getByTitle } from "./command/get-by-title";
import type { last } from "./command/last";
import type { locator } from "./command/locator";
import type { nth } from "./command/nth";

export interface FrameLocator extends PlaywrightFrameLocatorType, FrameLocatorClassType {
  first: typeof first;
  frameLocator: typeof frameLocator;
  getByAltText: typeof getByAltText;
  getByLabel: typeof getByLabel;
  getByRole: typeof getByRole;
  getByTestId: typeof getByTestId;
  getByText: typeof getByText;
  getByTitle: typeof getByTitle;
  last: typeof last;
  locator: typeof locator;
  nth: typeof nth;
}
