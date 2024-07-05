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
  first(...args: Parameters<typeof first>): ReturnType<typeof first>;
  frameLocator(...args: Parameters<typeof frameLocator>): ReturnType<typeof frameLocator>;
  frameLocator(...args: Parameters<typeof frameLocator>): ReturnType<typeof frameLocator>;
  getByAltText(...args: Parameters<typeof getByAltText>): ReturnType<typeof getByAltText>;
  getByLabel(...args: Parameters<typeof getByLabel>): ReturnType<typeof getByLabel>;
  getByRole(...args: Parameters<typeof getByRole>): ReturnType<typeof getByRole>;
  getByTestId(...args: Parameters<typeof getByTestId>): ReturnType<typeof getByTestId>;
  getByText(...args: Parameters<typeof getByText>): ReturnType<typeof getByText>;
  getByTitle(...args: Parameters<typeof getByTitle>): ReturnType<typeof getByTitle>;
  last(...args: Parameters<typeof last>): ReturnType<typeof last>;
  locator(...args: Parameters<typeof locator>): ReturnType<typeof locator>;
  nth(...args: Parameters<typeof nth>): ReturnType<typeof nth>;
}
