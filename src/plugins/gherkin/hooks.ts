import * as fs from "fs";
import * as object from "@utils/object";

import {
  After,
  AfterStep,
  Before,
  BeforeStep,
  ITestCaseHookParameter,
  ITestStepHookParameter,
  setDefaultTimeout,
  setWorldConstructor,
  Status
} from "@cucumber/cucumber";
import { ContentType } from "allure-js-commons";
import { Context } from "@plugins/fixture/context/context.fixture";

import chalk from "chalk";

setDefaultTimeout(process.env.DEBUG === "true" ? -1 : undefined);
setWorldConstructor(Context);

/** Dont run tests but still show these in the formatter */
Before({ tags: "@SKIP or @skip or @IGNORE or @ignore" }, () => Status.SKIPPED.toLowerCase());

Before({ tags: "@PENDING or @pending" }, () => Status.PENDING.toLowerCase());

Before({}, async function(this: Context) {
  this.browser = await this.createBrowser();
  this.page = await this.browser.newPage();
});

BeforeStep({}, async function(this: Context, params: ITestStepHookParameter) {
  const { pickleStep, gherkinDocument } = params;
  const step = object.deepSearch(gherkinDocument, "id", pickleStep.astNodeIds[0]);
  this.logger.info(`${chalk.green.dim.bold(step.keyword.trim())} ${chalk.green.dim(step.text)}`);
});

AfterStep({}, async function(this: Context, params: ITestStepHookParameter) {
  const { result } = params;

  if (result.status !== Status.PASSED) {
    if (this.page) {
      const buffer = await this.page.screenshot({ fullPage: true });
      await this.reporter.attachment("Screenshot", buffer, ContentType.PNG);
    }
  }
});

After({}, async function(this: Context, params: ITestCaseHookParameter) {
  const { result } = params;

  const teardown = async() => {
    if (this.page) {
      await this.page.close();
      await this.page.context().close();
      await this.page.context().browser().close();
    }
  };

  if (result.status !== Status.PASSED) {
    if (this.page) {
      if (this.config.browserOptions.recordVideo) {
        const path = await this.page.video().path();
        await teardown();
        await this.reporter.attachment("Recording", fs.readFileSync(path), ContentType.WEBM);
      }
    }
  }

  teardown();
});
