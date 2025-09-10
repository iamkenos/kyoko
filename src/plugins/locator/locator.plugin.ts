import { CommandPlugin } from "@plugins/plugin";

import type { Frame, Locator, Page } from "playwright";

import type { centerPoint } from "./commands/center-point";
import type { clickUntil } from "./commands/click-until";
import type { doUntil } from "./commands/do-until";
import type { dragAndDrop } from "./commands/drag-and-drop";
import type { expect } from "./commands/expect";
import type { fill } from "./commands/fill";
import type { getSelectOptions } from "./commands/get-select-options";
import type { hoverIntoView } from "./commands/hover-into-view";
import type { isFocused } from "./commands/is-focused";
import type { isSelected } from "./commands/is-selected";
import type { location } from "./commands/location";
import type { press } from "./commands/press";
import type { scrollIntoView } from "./commands/scroll-into-view";
import type { selectOption } from "./commands/select-option";
import type { uploadFiles } from "./commands/upload-files";
import type { waitUntil } from "./commands/wait-until";

export class LocatorPlugin extends CommandPlugin {
  constructor(opts = {}) {
    super(opts);
  }

  private getPageOrFrameLocatorFunctionsToPatch(target: Page | Frame | Locator) {
    return [
      target.frameLocator.name,
      target.locator.name,
      target.getByAltText.name,
      target.getByLabel.name,
      target.getByPlaceholder.name,
      target.getByRole.name,
      target.getByTestId.name,
      target.getByText.name,
      target.getByTitle.name
    ].filter(Boolean);
  }

  private getLocatorFunctionstoPatch(target: Locator) {
    const rest = this.getPageOrFrameLocatorFunctionsToPatch(target);
    return [
      ...rest,
      target.and.name,
      target.filter.name,
      target.first.name,
      target.last.name,
      target.nth.name,
      target.or.name
    ].filter(Boolean);
  }

  private deeplyPatchLocator(target: Locator) {
    const targetFns = this.getLocatorFunctionstoPatch(target);
    for (const fn of targetFns) {
      const patched = this.addCommandsTo(target);
      const descendant = target[fn].bind(patched);
      target[fn] = (...args: any[]) => {
        const locator = descendant(...args);
        return this.deeplyPatchLocator(locator); // patch recursively
      };
    }

    return target;
  }

  private patchLocatorsOnPageOrFrame(target: Page | Frame) {
    const targetFns = this.getPageOrFrameLocatorFunctionsToPatch(target);
    for (const fn of targetFns) {
      const unpatched = target[fn].bind(target);
      target[fn] = (...args: any[]) => {
        const locator = unpatched(...args);
        return this.deeplyPatchLocator(locator);
      };
    }
  }

  async onPageCreated(target: Page) {
    this.applyOnPageAndFrames(target, (target: Page | Frame) => this.patchLocatorsOnPageOrFrame(target));
  }
}

export interface ILocatorPlugin {
  centerPoint(...args: Parameters<typeof centerPoint>): ReturnType<typeof centerPoint>;
  clickUntil(...args: Parameters<typeof clickUntil>): ReturnType<typeof clickUntil>;
  doUntil(...args: Parameters<typeof doUntil>): ReturnType<typeof doUntil>;
  dragAndDrop(...args: Parameters<typeof dragAndDrop>): ReturnType<typeof dragAndDrop>;
  expect(...args: Parameters<typeof expect>): ReturnType<typeof expect>;
  fill(...args: Parameters<typeof fill>): ReturnType<typeof fill>;
  getSelectOptions(...args: Parameters<typeof getSelectOptions>): ReturnType<typeof getSelectOptions>;
  hoverIntoView(...args: Parameters<typeof hoverIntoView>): ReturnType<typeof hoverIntoView>;
  isFocused(...args: Parameters<typeof isFocused>): ReturnType<typeof isFocused>;
  isSelected(...args: Parameters<typeof isSelected>): ReturnType<typeof isSelected>;
  location(...args: Parameters<typeof location>): ReturnType<typeof location>;
  press(...args: Parameters<typeof press>): ReturnType<typeof press>;
  scrollIntoView(...args: Parameters<typeof scrollIntoView>): ReturnType<typeof scrollIntoView>;
  selectOption(...args: Parameters<typeof selectOption>): ReturnType<typeof selectOption>;
  press(...args: Parameters<typeof press>): ReturnType<typeof press>;
  expect(...args: Parameters<typeof expect>): ReturnType<typeof expect>;
  uploadFiles(...args: Parameters<typeof uploadFiles>): ReturnType<typeof uploadFiles>;
  waitUntil(...args: Parameters<typeof waitUntil>): ReturnType<typeof waitUntil>;
}
