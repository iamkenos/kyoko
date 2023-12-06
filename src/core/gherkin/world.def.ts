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
import { World as This } from "../world";

import chalk from "chalk";

setDefaultTimeout(process.env.DEBUG === "true" ? -1 : undefined);
setWorldConstructor(This);

Before({}, async function(this: This) {
  this.context = await this.createBrowserContext();
  this.page = await this.context.newPage();
});

BeforeStep({}, async function(this: This, params: ITestStepHookParameter) {
  const { pickleStep } = params;
  this.logger.info(`${chalk.yellow("GHERKIN")} ${chalk.green.dim.bold(`${pickleStep.type}: `)}${chalk.green.dim(pickleStep.text)}`);
});

AfterStep({}, async function(this: This, params: ITestStepHookParameter) {
  const { result, testStepId } = params;

  if (result.status !== Status.PASSED) {
    const buffer = await this.page.screenshot({ fullPage: true });
    await this.step(`${testStepId}`, () => {
      this.attach(buffer, "image/png");
      throw new Error();
    });
  }
});

After({}, async function(this: This) {
  await this.page.close();
  await this.page.context().close();
  await this.page.context().browser().close();
});
