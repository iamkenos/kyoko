import * as path from "path";

import { AllureRuntime } from "allure-js-commons";
import { CucumberJSAllureFormatter } from "allure-cucumberjs";

/** see https://github.com/allure-framework/allure-js/blob/master/packages/allure-cucumberjs/README.md */
export default class extends CucumberJSAllureFormatter {
  constructor(options: any) {
    super(options, new AllureRuntime({ resultsDir: path.join(_kyk_allure_results_dir, "allure") }), {});
  }
}
