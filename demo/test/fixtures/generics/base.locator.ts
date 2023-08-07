import * as path from "path";

import { Locator } from "@playwright/test";

import { ExpectedConditionOptions, LocatorConditions } from "@conditions";
import { Page } from "./base.world";

export class BaseLocator implements Locator {
  private _locator: Locator;

  constructor(locator: Locator) {
    Object.assign(this, locator);
    this._locator = locator;
  }

  // extended actions --------------------------------------------------------------------------------------------------
  async centerPoint() {
    const box = await this.boundingBox();
    const x = Math.round((box.x + (box.width / 2)) * 100) / 100;
    const y = Math.round((box.y + (box.height / 2)) * 100) / 100;
    return { x, y };
  }

  async dragAndDrop(target: BaseLocator) {
    const page = this.page();
    await this.hoverIntoView();
    await page.mouse.down();

    await target.hoverIntoView();
    await page.mouse.up();
  }

  async dropdownOptions(group?: { index: number }) {
    const hasGroup = !!group;
    const option = hasGroup ? this.locator("//optgroup").nth(group.index).locator("//option") : this.locator("//option");
    const count = await option.count();
    const options: { label: string, index: number, value: string, locator: BaseLocator }[] = [];

    for (let i = 0; i < count; i++) {
      const locator = option.nth(i);
      const text = await locator.textContent();
      const value = await locator.getAttribute("value");
      options.push({ label: text.trim(), index: i, value, locator });
    }
    return options;
  }

  expect(options?: ExpectedConditionOptions) {
    return new LocatorConditions(this, options);
  }

  given() {
    return this.expect({ soft: true });
  }

  async hoverIntoView(options?: { position?: { x: number, y: number } }) {
    const hasOffset = options?.position;
    const page = this.page();
    await this.scrollIntoView();

    const center = await this.centerPoint();
    let x: number, y: number;
    if (hasOffset) {
      x = options.position.x + center.x;
      y = options.position.y + center.y;
    } else {
      x = center.x;
      y = center.y;
    }

    await page.mouse.move(x, y);
  }

  async isSelected() {
    return await this.evaluate((node: HTMLOptionElement) => node.selected) as boolean;
  }

  async jsClick() {
    await this.evaluate((node: HTMLElement) => node.click());
  }

  async location() {
    // gets element location relative to the top of the document
    // see: https://stackoverflow.com/a/51283627/2285470
    const box = await this.boundingBox();
    const body = await this.evaluate(() => document.body.getBoundingClientRect()) as { x: number, y: number };
    const x = Math.round((box.x - body.x) * 100) / 100;
    const y = Math.round((box.y - body.y) * 100) / 100;
    return { x, y };
  }

  async scrollIntoView() {
    await this.evaluate((node: HTMLElement) => node.scrollIntoView({ behavior: "auto", block: "center", inline: "center" }));
  }

  then() {
    return this.expect();
  }

  toString() {
    return `${(this._locator as any)._selector}`;
  }

  async uploadFiles(...files: string[]) {
    const fileChooserPromise = this.page().waitForEvent("filechooser");
    await this.click();

    const fileChooser = await fileChooserPromise;
    const mapped = files.length > 0 ? files.map(file => path.join(this.page().config.baseDir, file)) : files;
    await fileChooser.setFiles(mapped);
  }

  // locator actions ---------------------------------------------------------------------------------------------------

  evaluate(...args: Parameters<Locator["evaluate"]>) {
    return this._locator.evaluate(...args);
  }

  evaluateAll(...args: Parameters<Locator["evaluateAll"]>) {
    return this._locator.evaluateAll(...args);
  }

  elementHandle(...args: Parameters<Locator["elementHandle"]>) {
    return this._locator.elementHandle(...args);
  }

  async all() {
    const list = await this._locator.all();
    return list.map(i => new BaseLocator(i));
  }

  allInnerTexts() {
    return this._locator.allInnerTexts();
  }

  allTextContents() {
    return this._locator.allTextContents();
  }

  and(...args: Parameters<Locator["and"]>) {
    return new BaseLocator(this._locator.and(...args));
  }

  blur(...args: Parameters<Locator["blur"]>) {
    return this._locator.blur(...args);
  }

  boundingBox(...args: Parameters<Locator["boundingBox"]>) {
    return this._locator.boundingBox(...args);
  }

  check(...args: Parameters<Locator["check"]>) {
    return this._locator.check(...args);
  }

  clear(...args: Parameters<Locator["clear"]>) {
    return this._locator.clear(...args);
  }

  click(...args: Parameters<Locator["click"]>) {
    return this._locator.click(...args);
  }

  count() {
    return this._locator.count();
  }

  dblclick(...args: Parameters<Locator["dblclick"]>) {
    return this._locator.dblclick(...args);
  }

  dispatchEvent(...args: Parameters<Locator["dispatchEvent"]>) {
    return this._locator.dispatchEvent(...args);
  }

  dragTo(...args: Parameters<Locator["dragTo"]>) {
    return this._locator.dragTo(...args);
  }

  elementHandles() {
    return this._locator.elementHandles();
  }

  evaluateHandle(...args: Parameters<Locator["evaluateHandle"]>) {
    return this._locator.evaluateHandle(...args);
  }

  fill(...args: Parameters<Locator["fill"]>) {
    return this._locator.fill(...args);
  }

  filter(...args: Parameters<Locator["filter"]>) {
    return this._locator.filter(...args);
  }

  first() {
    return new BaseLocator(this._locator.first());
  }

  focus(...args: Parameters<Locator["focus"]>) {
    return this._locator.focus(...args);
  }

  frameLocator(...args: Parameters<Locator["frameLocator"]>) {
    return this._locator.frameLocator(...args);
  }

  getAttribute(...args: Parameters<Locator["getAttribute"]>) {
    return this._locator.getAttribute(...args);
  }

  getByAltText(...args: Parameters<Locator["getByAltText"]>) {
    return new BaseLocator(this._locator.getByAltText(...args));
  }

  getByLabel(...args: Parameters<Locator["getByLabel"]>) {
    return new BaseLocator(this._locator.getByLabel(...args));
  }

  getByPlaceholder(...args: Parameters<Locator["getByPlaceholder"]>) {
    return new BaseLocator(this._locator.getByPlaceholder(...args));
  }

  getByRole(...args: Parameters<Locator["getByRole"]>) {
    return new BaseLocator(this._locator.getByRole(...args));
  }

  getByTestId(...args: Parameters<Locator["getByTestId"]>) {
    return new BaseLocator(this._locator.getByTestId(...args));
  }

  getByText(...args: Parameters<Locator["getByText"]>) {
    return new BaseLocator(this._locator.getByText(...args));
  }

  getByTitle(...args: Parameters<Locator["getByTitle"]>) {
    return new BaseLocator(this._locator.getByTitle(...args));
  }

  highlight() {
    return this._locator.highlight();
  }

  hover(...args: Parameters<Locator["hover"]>) {
    return this._locator.hover(...args);
  }

  innerHTML(...args: Parameters<Locator["innerHTML"]>) {
    return this._locator.innerHTML(...args);
  }

  innerText(...args: Parameters<Locator["innerText"]>) {
    return this._locator.innerText(...args);
  }

  inputValue(...args: Parameters<Locator["inputValue"]>) {
    return this._locator.inputValue(...args);
  }

  isChecked(...args: Parameters<Locator["isChecked"]>) {
    return this._locator.isChecked(...args);
  }

  isDisabled(...args: Parameters<Locator["isDisabled"]>) {
    return this._locator.isDisabled(...args);
  }

  isEditable(...args: Parameters<Locator["isEditable"]>) {
    return this._locator.isEditable(...args);
  }

  isEnabled(...args: Parameters<Locator["isEnabled"]>) {
    return this._locator.isEnabled(...args);
  }

  isHidden(...args: Parameters<Locator["isHidden"]>) {
    return this._locator.isHidden(...args);
  }

  isVisible(...args: Parameters<Locator["isVisible"]>) {
    return this._locator.isVisible(...args);
  }

  last() {
    return new BaseLocator(this._locator.last());
  }

  locator(...args: Parameters<Locator["locator"]>) {
    return new BaseLocator(this._locator.locator(...args));
  }

  nth(...args: Parameters<Locator["nth"]>) {
    return new BaseLocator(this._locator.nth(...args));
  }

  or(...args: Parameters<Locator["or"]>) {
    return new BaseLocator(this._locator.or(...args));
  }

  page() {
    return this._locator.page() as Page;
  }

  press(...args: Parameters<Locator["press"]>) {
    return this._locator.press(...args);
  }

  screenshot(...args: Parameters<Locator["screenshot"]>) {
    return this._locator.screenshot(...args);
  }

  scrollIntoViewIfNeeded(...args: Parameters<Locator["scrollIntoViewIfNeeded"]>) {
    return this._locator.scrollIntoViewIfNeeded(...args);
  }

  selectOption(...args: Parameters<Locator["selectOption"]>) {
    return this._locator.selectOption(...args);
  }

  selectText(...args: Parameters<Locator["selectText"]>) {
    return this._locator.selectText(...args);
  }

  setChecked(...args: Parameters<Locator["setChecked"]>) {
    return this._locator.setChecked(...args);
  }

  setInputFiles(...args: Parameters<Locator["setInputFiles"]>) {
    return this._locator.setInputFiles(...args);
  }

  tap(...args: Parameters<Locator["tap"]>) {
    return this._locator.tap(...args);
  }

  textContent(...args: Parameters<Locator["textContent"]>) {
    return this._locator.textContent(...args);
  }

  type(...args: Parameters<Locator["type"]>) {
    return this._locator.type(...args);
  }

  uncheck(...args: Parameters<Locator["uncheck"]>) {
    return this._locator.uncheck(...args);
  }

  waitFor(...args: Parameters<Locator["waitFor"]>) {
    return this._locator.waitFor(...args);
  }
}
