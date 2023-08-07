const callsites = require('callsites');
const path = require('path');

/**
 *
 * @param { import("../generics/base.world").Config } overrides
 * @see [CucumberConfig](https://github.com/cucumber/cucumber-js/blob/main/docs/configuration.md)
 * @returns
 */
function configure(overrides) {
  require('dotenv').config();
  const baseDir = path.dirname(callsites()[1].getFileName());
  const resultsDir = path.join(baseDir, process.env.RESULTS_DIR || overrides?.resultsDir || 'results/');
  const config = {
    format: [
      `html:${resultsDir}report.html`,
      `json:${resultsDir}report.json`,
      ...overrides?.format || []
    ],
    formatOptions: { snippetInterface: 'async-await' },
    parallel: +process.env.PARALLEL || overrides?.parallel || 0,
    paths: (overrides?.paths || ['features/']).map(i => path.join(baseDir, i)),
    require: [
      path.join(__dirname, '../gherkin/world.steps.ts'),
      path.join(__dirname, '../gherkin/page.steps.ts'),
      path.join(__dirname, '../gherkin/locator.steps.ts')
    ].concat((overrides?.require || []).map(i => path.join(baseDir, i))),
    requireModule: ['ts-node/register/transpile-only', 'tsconfig-paths/register'],
    strict: false,
    tags: process.env.TAGS || overrides?.tags
  };
  config.worldParameters = {
    config: {
      ...config,
      baseDir,
      baseURL: process.env.BASE_URL || overrides?.baseURL || '',
      browser: process.env.BROWSER || overrides?.browser || 'chromium',
      debug: process.env.DEBUG === 'true' || overrides?.debug || false,
      headless: process.env.HEADLESS === 'true' || overrides?.headless || false,
      pages: (overrides?.pages || ['fixtures/pages/**/*.page.ts']).map(i => path.join(baseDir, i)),
      resultsDir,
      timeout: +process.env.TIMEOUT || overrides?.timeout || 30000,
      ...overrides?.worldParameters
    }
  };

  return config;
}

module.exports = { configure };
