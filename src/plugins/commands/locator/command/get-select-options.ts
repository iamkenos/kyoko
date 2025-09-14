import type { Locator } from "playwright";

export async function getSelectOptions(this: Locator, group?: { index: number }) {
  const hasGroup = !!group;
  const option = hasGroup ? this.locator("//optgroup").nth(group.index).locator("//option") : this.locator("//option");
  const count = await option.count();
  const options: { label: string, index: number, value: string, locator: Locator }[] = [];

  for (let i = 0; i < count; i++) {
    const locator = option.nth(i);
    const text = await locator.textContent();
    const value = await locator.getAttribute("value");
    options.push({ label: text.trim(), index: i, value, locator });
  }
  return options;
}
