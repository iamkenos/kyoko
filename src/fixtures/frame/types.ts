import type { FrameLocator as PlaywrightFrameLocator } from "@playwright/test";
import type { FrameLocator as FrameLocatorClass } from "./frame";
import type { first } from "./commands/first";
import type { frameLocator } from "./commands/frame-locator";
import type { getByAltText } from "./commands/get-by-alt-text";
import type { getByLabel } from "./commands/get-by-label";
import type { getByRole } from "./commands/get-by-role";
import type { getByTestId } from "./commands/get-by-test-id";
import type { getByText } from "./commands/get-by-text";
import type { getByTitle } from "./commands/get-by-title";
import type { last } from "./commands/last";
import type { locator } from "./commands/locator";
import type { nth } from "./commands/nth";

export interface FrameLocator extends PlaywrightFrameLocator, FrameLocatorClass {
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
