import * as fs from "fs-extra";
import * as path from "path";

import { PageCondition } from "@conditions/page/page-condition";

import type { Locator } from "@commands/locator/types";
import type { PageSnapshotOptions } from "@config/types";

export class SnapshotMatch extends PageCondition {
  private readonly filename: string;
  private readonly options: PageSnapshotOptions;
  protected locator: Locator;

  private actualFilePath: string;
  private diffFilePath: string;
  private expectedFilePath: string;

  constructor(filename: string, options?: PageSnapshotOptions, preferred?: boolean) {
    super(preferred);
    this.filename = filename + ".png";
    this.options = options;
    this.on = this.filename;
  }

  private createFile(filename: string, data: Buffer) {
    fs.outputFileSync(filename, data);
  }

  async onFailure() {
    const attach = (filename: string) => {
      if (fs.existsSync(filename)) {
        this.page.context().attach(filename, "text/plain");
        this.page.context().attach(fs.readFileSync(filename), "image/png");
      }
    };

    attach(this.expectedFilePath);
    attach(this.actualFilePath);
    attach(this.diffFilePath);
  }

  private getPixelDiff(error: string) {
    if (error) {
      const matches = error.match(/ratio (\d*\.?\d+) of/);
      return matches ? +matches[1]: 1;
    } else {
      return 0;
    }
  }

  async evaluate() {
    try {
      const { browser, snapshots } = this.page.context().config;
      const { actualDir, expectedDir, diffDir, maxDiffPixelRatio, mask, skipCompare } = snapshots.images;
      this.actualFilePath = path.join(actualDir, browser, this.filename);
      this.diffFilePath = path.join(diffDir, browser, this.filename);
      this.expectedFilePath = path.join(expectedDir, browser, this.filename);

      const screenshotOptions = { mask: this.options?.mask || mask, fullPage: this.options?.fullPage };
      const comparatorOptions = { maxDiffPixelRatio: this.options?.maxDiffPixelRatio || maxDiffPixelRatio };
      const resultOptions = { screenshotOptions, comparatorOptions, locator: this.locator };
      const isSkip = skipCompare || this.options?.skipCompare;
      let result: { actual?: Buffer, diff?: Buffer, errorMessage?: string, diffPixelRatio: number };

      const hasExpectedSnapshot = fs.existsSync(this.expectedFilePath);
      if (hasExpectedSnapshot) {
        /** @see https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/client/page.ts#L65 */
        /** @see https://github.com/microsoft/playwright/blob/main/packages/protocol/src/channels.ts#L1922 */
        result = await (this.page as any)._expectScreenshot({ expected: fs.readFileSync(this.expectedFilePath), ...resultOptions });
      } else {
        result = await (this.page as any)._expectScreenshot(resultOptions);
        this.createFile(this.expectedFilePath, result.actual);
      }

      result.actual && this.createFile(this.actualFilePath, result.actual);
      result.diff && this.createFile(this.diffFilePath, result.diff);
      result.diffPixelRatio = this.getPixelDiff(result?.errorMessage);

      const isSame = !result.errorMessage ? true : result.diffPixelRatio <= comparatorOptions.maxDiffPixelRatio;
      this.expected = `Within ${comparatorOptions.maxDiffPixelRatio} ratio difference.`;
      this.actual = result.errorMessage || this.expected;
      this.passed = isSkip ? true : isSame;
      this.not = isSkip ? false : this.not;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
