import * as fs from "fs-extra";
import * as path from "path";

import {
  After,
  AfterStep,
  Before,
  BeforeAll,
  BeforeStep,
  ITestStepHookParameter,
  setDefaultTimeout,
  setWorldConstructor,
  Status
} from "@cucumber/cucumber";
import { ConsoleReporter } from "@serenity-js/console-reporter";
import { ArtifactArchiver, configure, Duration } from "@serenity-js/core";
import { SerenityBDDReporter } from "@serenity-js/serenity-bdd";
import { World as This } from "../world";

import chalk from "chalk";

setDefaultTimeout(process.env.DEBUG === "true" ? -1 : undefined);
setWorldConstructor(This);

BeforeAll({}, async function(this: This) {
  /** https://github.com/serenity-js/serenity-js-cucumber-playwright-template/blob/main/features/support/serenity.config.ts */
  configure({
    crew: [
      ArtifactArchiver.storingArtifactsAt(path.join(process.env.KYK_RESULTS, "serenity")),
      new SerenityBDDReporter(),
      ConsoleReporter.forDarkTerminals()
    ],
    cueTimeout: Duration.ofSeconds(5)
  });
});

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
