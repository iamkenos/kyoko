const callsites = require("callsites");
const fs = require("fs-extra");
const path = require("path");

/**
 * Creates a cucumber config object with default values.
 * @param { import("./types").Config } overrides overrides the default configuration values.
 * @see [CucumberConfig](https://github.com/cucumber/cucumber-js/blob/main/docs/configuration.md)
 * @returns { import("./types").Config } configuration
 */
function configure(overrides) {
  require("dotenv").config();

  // custom options defaults
  const baseDir = path.dirname(callsites()[1].getFileName()).replace("file://", "");
  const baseURL = process.env.BASE_URL || overrides?.baseURL || "";
  const browser = process.env.BROWSER || overrides?.browser || "chromium";
  const debug = process.env.DEBUG === "true" || overrides?.debug || false;
  const downloadsDir = path.join(baseDir, process.env.DOWNLOADS_DIR || overrides?.downloadsDir || "downloads/");
  const headless = process.env.HEADLESS === "true" || overrides?.headless || false;
  const logLevel = process.env.LOG_LEVEL || overrides?.logLevel || "error";
  const pages = (overrides?.pages || ["fixtures/pages/**/*.page.ts"]).map(i => path.join(baseDir, i));
  const resultsDir = path.join(baseDir, process.env.RESULTS_DIR || overrides?.resultsDir || "results/");
  const snapshotsDir = path.join(baseDir, process.env.SNAPSHOTS_DIR || overrides?.snapshotsDir || "snapshots/");
  const timeout = +process.env.TIMEOUT || overrides?.timeout || 30000;
  const browserOptions = { headless, ...overrides?.browserOptions };
  const contextOptions = { baseURL, ignoreHTTPSErrors: false, viewport: { width: 1675, height: 1020 }, ...overrides?.contextOptions };
  const snapshots = {
    images: {
      outDir: "images",
      skipCompare: false,
      mask: [],
      maxDiffPixelRatio: 0
    }
  };
  // resolve and prepare snapshot directories
  fs.removeSync(resultsDir);
  Object.keys(snapshots).forEach(key => {
    snapshots[key].outDir = path.resolve(snapshotsDir, snapshots[key].outDir);
    snapshots[key].actualDir = path.resolve(snapshots[key].outDir, "actual");
    snapshots[key].expectedDir = path.resolve(snapshots[key].outDir, "expected");
    snapshots[key].diffDir = path.resolve(snapshots[key].outDir, "diff");
    fs.removeSync(snapshots[key].actualDir);
    fs.removeSync(snapshots[key].diffDir);
    fs.mkdirsSync(snapshots[key].expectedDir);
  });
  const custom = { baseDir, baseURL, browser, browserOptions, contextOptions, debug, downloadsDir, headless, logLevel, pages, resultsDir, snapshots, timeout };

  // cucumber options defaults
  const config = {
    ...overrides,
    format: [ "summary", `html:${resultsDir}report.html`, `json:${resultsDir}report.json`, ...overrides?.format || [] ],
    formatOptions: { snippetInterface: "async-await", printAttachments: false },
    parallel: debug ? 0 : +process.env.PARALLEL || overrides?.parallel || 0,
    paths: process.env.PATHS ? [process.env.PATHS].filter(Boolean) : (overrides?.paths || ["features/"]).map(i => path.join(baseDir, i)),
    require: [ path.join(__dirname, "../core/gherkin/*.def.js")].concat((overrides?.require || ["fixtures/pages/**/*.def.ts"]).map(i => path.join(baseDir, i))),
    requireModule: ["@babel/register", "ts-node/register/transpile-only", "tsconfig-paths/register"],
    strict: false,
    tags: process.env.TAGS || overrides?.tags
  };

  // assign the whole thing to world parameters so these can be accessible from cucumber's world context
  const { worldParameters, ...rest } = config;
  config.worldParameters = { config: { ...rest, ...custom }, ...worldParameters };
  return config;
}

module.exports = { configure };
