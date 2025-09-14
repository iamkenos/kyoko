import { WindowDirection, WindowNavigation } from "@plugins/gherkin/enums";

import type { BrowserContext, Page } from "playwright";
import type { Context } from "@plugins/fixture/context/context.fixture";
import type { PageObject } from "@plugins/fixture/page/page.fixture";

export async function navigate(page: PageObject) {
  await page.navigate();
}

export async function leaveViewport(page: Page) {
  await page.locator("html").dispatchEvent("mouseleave");
}

export async function closeLastOpenedPage(ctx: Context) {
  return await ctx.browser.closeLastPage();
}

export async function closeOtherPages(ctx: Context) {
  return await ctx.browser.closeOtherPages();
}

export async function press(page: Page, key: string) {
  await page.keyboard.press(key);
}

export function recordRequests(page: Page) {
  page.requestsInterceptor();
}

export async function scrollToCoordinates(page: Page, coordinates: { x: number, y: number }) {
  await page.scrollTo(coordinates);
}

export async function scrollTo(page: Page, direction: WindowDirection) {
  switch (direction) {
    case WindowDirection.BOTTOM: {
      await page.scrollToBottom();
      break;
    }
    default: {
      await page.scrollToTop();
      break;
    }
  }
}

export async function switchToFrame(page: Page, frame?: string) {
  await page.switchToFrame(frame);
}

export async function open(page: Page, url: string) {
  await page.goto(url);
}

export async function openInNewTab(browser: BrowserContext, url: string) {
  const newPage = await browser.newPage();
  await newPage.goto(url);
}

export async function focusOnTheLastOpenedTab(ctx: Context) {
  await ctx.page.expect().windowCountMoreThan(1).poll();
  return ctx.browser.pages().at(-1);
}

export async function navigateDirection(page: Page, direction: WindowNavigation) {
  switch (direction) {
    case WindowNavigation.BACK: {
      await page.goBack();
      break;
    }
    default: {
      await page.goForward();
      break;
    }
  }
}
