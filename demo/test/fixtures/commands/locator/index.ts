import * as path from "path";

import { Locator as PlaywrightLocator } from "@playwright/test";

import { ExpectedConditionOptions, ExpectedConditions, LocatorConditions } from "@conditions";
import { Page } from "@generics";

export class Locator implements PlaywrightLocator {
  private _locator: PlaywrightLocator;

  constructor(locator: PlaywrightLocator) {
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

  async dragAndDrop(target: Locator) {
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
    const options: { label: string, index: number, value: string, locator: Locator }[] = [];

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

  async clickUntil(conditions: ExpectedConditions, ...args: Parameters<PlaywrightLocator["click"]>) {
    const fn = async() => await this.click(...args);
    await this.doUntil({ name: this.clickUntil.name, fn }, conditions);
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

  async doUntil(action: { fn: Function, name: string }, conditions: ExpectedConditions) {
    await conditions.setName(action.name).setAction(action.fn).poll();
  }

  // locator actions ---------------------------------------------------------------------------------------------------

  evaluate(...args: Parameters<PlaywrightLocator["evaluate"]>) {
    return this._locator.evaluate(...args);
  }

  evaluateAll(...args: Parameters<PlaywrightLocator["evaluateAll"]>) {
    return this._locator.evaluateAll(...args);
  }

  elementHandle(...args: Parameters<PlaywrightLocator["elementHandle"]>) {
    return this._locator.elementHandle(...args);
  }

  async all() {
    const list = await this._locator.all();
    return list.map(i => new Locator(i));
  }

  allInnerTexts() {
    return this._locator.allInnerTexts();
  }

  allTextContents() {
    return this._locator.allTextContents();
  }

  and(...args: Parameters<PlaywrightLocator["and"]>) {
    return new Locator(this._locator.and(...args));
  }

  blur(...args: Parameters<PlaywrightLocator["blur"]>) {
    return this._locator.blur(...args);
  }

  boundingBox(...args: Parameters<PlaywrightLocator["boundingBox"]>) {
    return this._locator.boundingBox(...args);
  }

  check(...args: Parameters<PlaywrightLocator["check"]>) {
    return this._locator.check(...args);
  }

  clear(...args: Parameters<PlaywrightLocator["clear"]>) {
    return this._locator.clear(...args);
  }

  click(...args: Parameters<PlaywrightLocator["click"]>) {
    return this._locator.click(...args);
  }

  count() {
    return this._locator.count();
  }

  dblclick(...args: Parameters<PlaywrightLocator["dblclick"]>) {
    return this._locator.dblclick(...args);
  }

  dispatchEvent(...args: Parameters<PlaywrightLocator["dispatchEvent"]>) {
    return this._locator.dispatchEvent(...args);
  }

  dragTo(...args: Parameters<PlaywrightLocator["dragTo"]>) {
    return this._locator.dragTo(...args);
  }

  elementHandles() {
    return this._locator.elementHandles();
  }

  evaluateHandle(...args: Parameters<PlaywrightLocator["evaluateHandle"]>) {
    return this._locator.evaluateHandle(...args);
  }

  fill(...args: Parameters<PlaywrightLocator["fill"]>) {
    return this._locator.fill(...args);
  }

  filter(...args: Parameters<PlaywrightLocator["filter"]>) {
    return this._locator.filter(...args);
  }

  first() {
    return new Locator(this._locator.first());
  }

  focus(...args: Parameters<PlaywrightLocator["focus"]>) {
    return this._locator.focus(...args);
  }

  frameLocator(...args: Parameters<PlaywrightLocator["frameLocator"]>) {
    return this._locator.frameLocator(...args);
  }

  getAttribute(...args: Parameters<PlaywrightLocator["getAttribute"]>) {
    return this._locator.getAttribute(...args);
  }

  getByAltText(...args: Parameters<PlaywrightLocator["getByAltText"]>) {
    return new Locator(this._locator.getByAltText(...args));
  }

  getByLabel(...args: Parameters<PlaywrightLocator["getByLabel"]>) {
    return new Locator(this._locator.getByLabel(...args));
  }

  getByPlaceholder(...args: Parameters<PlaywrightLocator["getByPlaceholder"]>) {
    return new Locator(this._locator.getByPlaceholder(...args));
  }

  getByRole(...args: Parameters<PlaywrightLocator["getByRole"]>) {
    return new Locator(this._locator.getByRole(...args));
  }

  getByTestId(...args: Parameters<PlaywrightLocator["getByTestId"]>) {
    return new Locator(this._locator.getByTestId(...args));
  }

  getByText(...args: Parameters<PlaywrightLocator["getByText"]>) {
    return new Locator(this._locator.getByText(...args));
  }

  getByTitle(...args: Parameters<PlaywrightLocator["getByTitle"]>) {
    return new Locator(this._locator.getByTitle(...args));
  }

  highlight() {
    return this._locator.highlight();
  }

  hover(...args: Parameters<PlaywrightLocator["hover"]>) {
    return this._locator.hover(...args);
  }

  innerHTML(...args: Parameters<PlaywrightLocator["innerHTML"]>) {
    return this._locator.innerHTML(...args);
  }

  innerText(...args: Parameters<PlaywrightLocator["innerText"]>) {
    return this._locator.innerText(...args);
  }

  inputValue(...args: Parameters<PlaywrightLocator["inputValue"]>) {
    return this._locator.inputValue(...args);
  }

  isChecked(...args: Parameters<PlaywrightLocator["isChecked"]>) {
    return this._locator.isChecked(...args);
  }

  isDisabled(...args: Parameters<PlaywrightLocator["isDisabled"]>) {
    return this._locator.isDisabled(...args);
  }

  isEditable(...args: Parameters<PlaywrightLocator["isEditable"]>) {
    return this._locator.isEditable(...args);
  }

  isEnabled(...args: Parameters<PlaywrightLocator["isEnabled"]>) {
    return this._locator.isEnabled(...args);
  }

  isHidden(...args: Parameters<PlaywrightLocator["isHidden"]>) {
    return this._locator.isHidden(...args);
  }

  isVisible(...args: Parameters<PlaywrightLocator["isVisible"]>) {
    return this._locator.isVisible(...args);
  }

  last() {
    return new Locator(this._locator.last());
  }

  locator(...args: Parameters<PlaywrightLocator["locator"]>) {
    return new Locator(this._locator.locator(...args));
  }

  nth(...args: Parameters<PlaywrightLocator["nth"]>) {
    return new Locator(this._locator.nth(...args));
  }

  or(...args: Parameters<PlaywrightLocator["or"]>) {
    return new Locator(this._locator.or(...args));
  }

  page() {
    return this._locator.page() as Page;
  }

  press(...args: Parameters<PlaywrightLocator["press"]>) {
    return this._locator.press(...args);
  }

  screenshot(...args: Parameters<PlaywrightLocator["screenshot"]>) {
    return this._locator.screenshot(...args);
  }

  scrollIntoViewIfNeeded(...args: Parameters<PlaywrightLocator["scrollIntoViewIfNeeded"]>) {
    return this._locator.scrollIntoViewIfNeeded(...args);
  }

  selectOption(...args: Parameters<PlaywrightLocator["selectOption"]>) {
    return this._locator.selectOption(...args);
  }

  selectText(...args: Parameters<PlaywrightLocator["selectText"]>) {
    return this._locator.selectText(...args);
  }

  setChecked(...args: Parameters<PlaywrightLocator["setChecked"]>) {
    return this._locator.setChecked(...args);
  }

  setInputFiles(...args: Parameters<PlaywrightLocator["setInputFiles"]>) {
    return this._locator.setInputFiles(...args);
  }

  tap(...args: Parameters<PlaywrightLocator["tap"]>) {
    return this._locator.tap(...args);
  }

  textContent(...args: Parameters<PlaywrightLocator["textContent"]>) {
    return this._locator.textContent(...args);
  }

  type(...args: Parameters<PlaywrightLocator["type"]>) {
    return this._locator.type(...args);
  }

  uncheck(...args: Parameters<PlaywrightLocator["uncheck"]>) {
    return this._locator.uncheck(...args);
  }

  waitFor(...args: Parameters<PlaywrightLocator["waitFor"]>) {
    return this._locator.waitFor(...args);
  }
}
