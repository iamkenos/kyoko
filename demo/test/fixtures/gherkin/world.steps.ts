import * as fs from "fs-extra";
import * as path from "path";

import {
  After,
  AfterStep,
  Before,
  ITestStepHookParameter,
  setDefaultTimeout,
  setWorldConstructor,
  Status
} from "@cucumber/cucumber";

import { BaseWorld as This } from "@generics";

setDefaultTimeout(process.env.DEBUG === "true" ? -1 : undefined);
setWorldConstructor(This);

Before({}, async function(this: This) {
  this.context = await this.createBrowserContext();
  this.page = await this.context.newPage();
});

AfterStep({}, async function(this: This, params: ITestStepHookParameter) {
  const { result, testStepId } = params;

  if (result.status !== Status.PASSED) {
    const screenshotFile = path.join(this.config.resultsDir, `${testStepId}.png`);
    await this.page.screenshot({ path: screenshotFile, fullPage: true });
    this.attach(fs.readFileSync(screenshotFile), "image/png");
  }
});

After({}, async function(this: This) {
  await this.page.close();
  await this.page.context().close();
  await this.page.context().browser().close();
});
