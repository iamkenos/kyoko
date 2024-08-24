import * as fs from "fs-extra";
import * as path from "path";

import callsites from "callsites";
import dotenv from "dotenv";

import type { Config as BaseConfig } from "./types";
import type { NestedOmit } from "../common/types";

export * from "./types";

type Config = NestedOmit<BaseConfig, "snapshots.images.outDir">;

function loadEnv(baseDir: string) {
  const { NODE_ENV } = process.env;
  dotenv.config({ path: NODE_ENV ? path.join(baseDir, `.env.${NODE_ENV}`) : path.join(baseDir, ".env") });
}

function getConfigBaseURL(overrides: Partial<Config>) {
  const { BASE_URL } = process.env;
  const { baseURL = "" } = overrides;
  return BASE_URL ? BASE_URL : baseURL;
}

function getConfigBrowser(overrides: Partial<Config>) {
  const SUPPORTED_BROWSERS = ["chromium", "firefox", "webkit"];
  const { BROWSER } = process.env;
  const { browser = SUPPORTED_BROWSERS[0] } = overrides;
  return BROWSER && SUPPORTED_BROWSERS.includes(BROWSER) ? BROWSER : browser;
}

function getConfigDebug(overrides: Partial<Config>) {
  const { DEBUG } = process.env;
  const { debug = false } = overrides;
  return DEBUG ? DEBUG === "true" : debug;
}

function getConfigDownloadsDir(overrides: Partial<Config>) {
  const { DOWNLOADS_DIR } = process.env;
  const { downloadsDir = "downloads/", baseDir } = overrides;
  const directory = path.join(baseDir, DOWNLOADS_DIR ? DOWNLOADS_DIR : downloadsDir);
  fs.removeSync(directory);
  return directory;
}

function getConfigHeadless(overrides: Partial<Config>) {
  const { HEADLESS } = process.env;
  const { headless = false } = overrides;
  return HEADLESS ? HEADLESS === "true" : headless;
}

function getConfigLocale(overrides: Partial<Config>) {
  const { LOCALE } = process.env;
  const { locale } = overrides;
  return LOCALE ? LOCALE : locale;
}

function getConfigLogLevel(overrides: Partial<Config>) {
  const { LOG_LEVEL } = process.env;
  const { logLevel = "info" } = overrides;
  const debug = getConfigDebug(overrides);
  process.env.LOG_LEVEL = debug ? "debug" : LOG_LEVEL ? LOG_LEVEL : logLevel;
  return process.env.LOG_LEVEL;
}

function getConfigPages(overrides: Partial<Config>) {
  const { pages = ["fixtures/pages/**/*.page{,.*}.ts"], baseDir } = overrides;
  return pages.map(i => path.join(baseDir, i));
}

function getConfigResultsDir(overrides: Partial<Config>) {
  const { RESULTS_DIR } = process.env;
  const { resultsDir = "results/", baseDir } = overrides;
  return path.join(baseDir, RESULTS_DIR ? RESULTS_DIR : resultsDir);
}

function getConfigSnapshotsDir(overrides: Partial<Config>) {
  const { SNAPSHOTS_DIR } = process.env;
  const { snapshotsDir = "snapshots/", baseDir } = overrides;
  return path.join(baseDir, SNAPSHOTS_DIR ? SNAPSHOTS_DIR : snapshotsDir);
}

function getConfigTimeout(overrides: Partial<Config>) {
  const { TIMEOUT } = process.env;
  const { timeout = 30000 } = overrides;
  return +TIMEOUT ? +TIMEOUT : timeout;
}

function getConfigBrowserOptions(overrides: Partial<Config>) {
  const { browserOptions } = overrides;
  const headless = getConfigHeadless(overrides);
  return { headless, ...browserOptions };
}

function getConfigContextOptions(overrides: Partial<Config>) {
  const { contextOptions } = overrides;
  const baseURL = getConfigBaseURL(overrides);
  return { baseURL, ignoreHTTPSErrors: false, viewport: { width: 1675, height: 1020 }, ...contextOptions };
}

function getConfigSnapshots(overrides: Partial<Config>) {
  const [ actualDir, expectedDir, diffDir ] = ["actual", "expected", "diff"];
  const { snapshots } = overrides;
  const snapshotsDir = getConfigSnapshotsDir(overrides);
  const snapshotOptions = {
    images: {
      outDir: "images",
      skipCompare: false,
      mask: [],
      maxDiffPixelRatio: 0,
      ...snapshots?.images
    }
  };
  Object.keys(snapshotOptions).forEach(key => {
    snapshotOptions[key].outDir = path.resolve(snapshotsDir, snapshotOptions[key].outDir);
    snapshotOptions[key].actualDir = path.resolve(snapshotOptions[key].outDir, actualDir);
    snapshotOptions[key].expectedDir = path.resolve(snapshotOptions[key].outDir, expectedDir);
    snapshotOptions[key].diffDir = path.resolve(snapshotOptions[key].outDir, diffDir);
    fs.removeSync(snapshotOptions[key].actualDir);
    fs.removeSync(snapshotOptions[key].diffDir);
  });
  return snapshotOptions;
}

function getCukesFormat(overrides: Partial<Config>) {
  const resultsDir = getConfigResultsDir(overrides);
  const { format = [] } = overrides;
  fs.removeSync(resultsDir);
  return [
    "summary",
    `"html":"${resultsDir}report.html"`,
    `"json":"${resultsDir}report.json"`,
    `"file://${path.join(__dirname, "../core/utils/reporter.js")}":"${resultsDir}allure/report.json"`,
    ...format
  ];
}

function getCukesFormatOptions() {
  return { snippetInterface: "async-await", printAttachments: false };
}

function getCukesParallel(overrides: Partial<Config>) {
  const { PARALLEL } = process.env;
  const { parallel = 0 } = overrides;
  const debug = getConfigDebug(overrides);
  return debug ? 0 : PARALLEL ? +PARALLEL : parallel;
}

function getCukesPaths(overrides: Partial<Config>) {
  const { PATHS } = process.env;
  const { paths = ["features/"], baseDir } = overrides;
  return PATHS ? [PATHS].filter(Boolean) : paths.map(i => path.join(baseDir, i));
}

function getCukesRequire(overrides: Partial<Config>) {
  const { require = ["fixtures/**/*.{steps,glue}.ts"], baseDir } = overrides;
  return [path.join(__dirname, "../core/gherkin/**/*.{steps,glue}.js")]
    .concat(require.map(i => path.join(baseDir, i)));
}

function getCukesRequireModule() {
  return ["ts-node/register/transpile-only", "tsconfig-paths/register"];
}

function getCukesTags(overrides: Partial<Config>) {
  const { TAGS } = process.env;
  const { tags } = overrides;
  return TAGS ? TAGS : tags;
}

function getCukesWorldParameters(overrides: Partial<Config>) {
  const { worldParameters = {} } = overrides;
  return worldParameters;
}

/**
 * Creates a cucumber config object with default values.
 * @see [CucumberConfig](https://github.com/cucumber/cucumber-js/blob/main/docs/configuration.md)
 */
export function configure(overrides: Partial<Config> = {}) {
  const baseDir = path.dirname(callsites()[1].getFileName()).replace("file://", "");
  loadEnv(baseDir);

  // custom options defaults
  overrides.baseDir = baseDir;
  const baseURL = getConfigBaseURL(overrides);
  const browser = getConfigBrowser(overrides);
  const debug = getConfigDebug(overrides);
  const downloadsDir = getConfigDownloadsDir(overrides);
  const headless = getConfigHeadless(overrides);
  const locale = getConfigLocale(overrides);
  const logLevel = getConfigLogLevel(overrides);
  const pages = getConfigPages(overrides);
  const resultsDir = getConfigResultsDir(overrides);
  const timeout = getConfigTimeout(overrides);
  const browserOptions = getConfigBrowserOptions(overrides);
  const contextOptions = getConfigContextOptions(overrides);
  const snapshots = getConfigSnapshots(overrides);
  const custom = { baseDir, baseURL, browser, browserOptions, contextOptions, debug, downloadsDir, headless, locale, logLevel, pages, resultsDir, snapshots, timeout };

  // cucumber options defaults
  const config = {
    ...overrides,
    format: getCukesFormat(overrides),
    formatOptions: getCukesFormatOptions(),
    parallel: getCukesParallel(overrides),
    paths: getCukesPaths(overrides),
    require: getCukesRequire(overrides),
    requireModule: getCukesRequireModule(),
    strict: false,
    tags: getCukesTags(overrides),
    worldParameters: getCukesWorldParameters(overrides)
  };

  // assign the whole thing to world parameters so these can be accessible from cucumber's world context
  const { worldParameters, ...rest } = config;
  config.worldParameters = { config: { ...rest, ...custom }, ...worldParameters };
  globalThis.world = { config: config.worldParameters.config } as any;

  return config;
}
