const callsites = require('callsites');
const fs = require('fs-extra');
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
  const snapshotsDir = path.join(baseDir, process.env.SNAPSHOTS_DIR || overrides?.snapshotsDir || 'snapshots/');

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
      snapshots: {
        images: {
          outDir: 'images',
          skipCompare: false,
          mask: [],
          maxDiffPixelRatio: 0
        }
      },
      timeout: +process.env.TIMEOUT || overrides?.timeout || 30000,
      ...overrides?.worldParameters
    }
  };

  // resolve and prepare snapshot directories
  const { snapshots } = config.worldParameters.config;
  fs.removeSync(resultsDir);
  Object.keys(snapshots).forEach(key => {
    snapshots[key].outDir = path.resolve(snapshotsDir, snapshots[key].outDir);
    snapshots[key].actualDir = path.resolve(snapshots[key].outDir, 'actual');
    snapshots[key].expectedDir = path.resolve(snapshots[key].outDir, 'expected');
    snapshots[key].diffDir = path.resolve(snapshots[key].outDir, 'diff');
    fs.removeSync(snapshots[key].actualDir);
    fs.removeSync(snapshots[key].diffDir);
    fs.mkdirsSync(snapshots[key].expectedDir);
  });

  return config;
}

module.exports = { configure };