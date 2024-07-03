import * as object from "@common/utils/object";

import {
  After,
  AfterStep,
  Before,
  BeforeStep,
  ITestStepHookParameter,
  setDefaultTimeout,
  setWorldConstructor,
  Status
} from "@cucumber/cucumber";
import { This, World } from "../../world";

import chalk from "chalk";

setDefaultTimeout(process.env.DEBUG === "true" ? -1 : undefined);
setWorldConstructor(World);

Before({}, async function(this: World) {
  this.context = await this.createBrowserContext();
  this.page = await this.context.newPage();
});

BeforeStep({}, async function(this: This, params: ITestStepHookParameter) {
  const { pickleStep, gherkinDocument } = params;
  const step = object.deepSearch(gherkinDocument, "id", pickleStep.astNodeIds[0]);
  this.logger.info(`${chalk.green.dim.bold(step.keyword.trim())} ${chalk.green.dim(step.text)}`);
});

AfterStep({}, async function(this: This, params: ITestStepHookParameter) {
  const { result } = params;

  if (result.status !== Status.PASSED) {
    const buffer = await this.page.screenshot({ fullPage: true });
    this.reporter.attach(buffer, "image/png");
  }
});

After({}, async function(this: This) {
  await this.page.close();
  await this.page.context().close();
  await this.page.context().browser().close();
});
