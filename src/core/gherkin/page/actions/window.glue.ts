import { WindowDirection, WindowNavigation } from "@core/gherkin/enums";

import type { BrowserContext } from "@fixtures/context/types";
import type { Page } from "@fixtures/page/types";
import type { PageObject } from "@core/page-object";
import type { World } from "@core/world";

export async function navigate(page: PageObject) {
  await page.navigate();
}

export async function leaveViewport(page: Page) {
  await page.locator("html").dispatchEvent("mouseleave");
}

export async function closeLastOpenedPage(world: World) {
  return await world.context.closeLastPage();
}

export async function closeOtherPages(world: World) {
  return await world.context.closeOtherPages();
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

export async function openInNewTab(context: BrowserContext, url: string) {
  const newPage = await context.newPage();
  await newPage.goto(url);
}

export async function focusOnTheLastOpenedTab(world: World) {
  await world.page.expect().windowCountMoreThan(1).poll();
  return world.context.lastPage();
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
