import type { Locator } from "playwright";
import type { WebComponent } from "@core/fixtures/web-component.fixture";

export async function dragAndDrop(this: Locator, target: Locator | WebComponent) {
  const page = this.page();
  await this.hoverIntoView();
  await page.mouse.down();

  await target.hoverIntoView();
  await page.mouse.up();
}
