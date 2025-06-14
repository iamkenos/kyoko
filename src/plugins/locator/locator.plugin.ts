import { CommandPlugin } from "@plugins/plugin";

import type { Frame, Locator, Page } from "@playwright/test";

export class LocatorPlugin extends CommandPlugin {
  constructor(opts = {}) {
    super(opts);
  }

  private getPageOrFrameLocatorFunctionsToPatch(target: Page | Frame) {
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
    const rest = this.getPageOrFrameLocatorFunctionsToPatch(target.page());
    return [
      ...rest,
      target.and.name,
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
