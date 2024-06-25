import * as fs from "fs-extra";
import * as path from "path";

import callsites from "callsites";
import dotenv from "dotenv";

import type { Config } from "./types";

export * from "./types";

/**
 * Creates a cucumber config object with default values.
 * @see [CucumberConfig](https://github.com/cucumber/cucumber-js/blob/main/docs/configuration.md)
 */
export function configure(overrides?: Partial<Config>) {
  const baseDir = path.dirname(callsites()[1].getFileName()).replace("file://", "");
  dotenv.config({ path: process.env.NODE_ENV ? path.join(baseDir, `.env.${process.env.NODE_ENV}`) : path.join(baseDir, ".env") });

  // custom options defaults
  const baseURL = process.env.BASE_URL ? process.env.BASE_URL : overrides?.baseURL || "";
  const browser = process.env.BROWSER ? process.env.BROWSER : overrides?.browser || "chromium";
  const debug = process.env.DEBUG ? process.env.DEBUG === "true" : overrides?.debug || false;
  const downloadsDir = path.join(baseDir, process.env.DOWNLOADS_DIR ? process.env.DOWNLOADS_DIR : overrides?.downloadsDir || "downloads/");
  const headless = process.env.HEADLESS ? process.env.HEADLESS === "true" : overrides?.headless || false;
  const locale = process.env.LOCALE ? process.env.LOCALE : overrides?.locale || undefined;
  const logLevel = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : overrides?.logLevel || "info";
  const pages = (overrides?.pages || ["fixtures/pages/**/*.page{,.*}.ts"]).map(i => path.join(baseDir, i));
  const resultsDir = path.join(baseDir, process.env.RESULTS_DIR ? process.env.RESULTS_DIR : overrides?.resultsDir || "results/");
  const snapshotsDir = path.join(baseDir, process.env.SNAPSHOTS_DIR ? process.env.SNAPSHOTS_DIR : overrides?.snapshotsDir || "snapshots/");
  const timeout = +process.env.TIMEOUT ? +process.env.TIMEOUT : overrides?.timeout || 30000;
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
  process.env.KYK_RESULTS = resultsDir;
  process.env.LOG_LEVEL = debug ? "debug" : logLevel;
  fs.removeSync(resultsDir);
  Object.keys(snapshots).forEach(key => {
    snapshots[key].outDir = path.resolve(snapshotsDir, snapshots[key].outDir);
    snapshots[key].actualDir = path.resolve(snapshots[key].outDir, "actual");
    snapshots[key].expectedDir = path.resolve(snapshots[key].outDir, "expected");
    snapshots[key].diffDir = path.resolve(snapshots[key].outDir, "diff");
    fs.removeSync(snapshots[key].actualDir);
    fs.removeSync(snapshots[key].diffDir);
  });
  const custom = { baseDir, baseURL, browser, browserOptions, contextOptions, debug, downloadsDir, headless, locale, logLevel, pages, resultsDir, snapshots, timeout };

  // cucumber options defaults
  const config = {
    ...overrides,
    format: ["summary", `"json":"${resultsDir}report.json"`, `"file://${path.join(__dirname, "../core/utils/reporter.js")}":"${resultsDir}allure/report.json"`, ...overrides?.format || [] ],
    formatOptions: { snippetInterface: "async-await", printAttachments: false },
    parallel: debug ? 0 : overrides?.parallel || +process.env.PARALLEL || 0,
    paths: process.env.PATHS ? [process.env.PATHS].filter(Boolean) : (overrides?.paths || ["features/"]).map(i => path.join(baseDir, i)),
    require: [path.join(__dirname, "../core/gherkin/*.def.js")].concat((overrides?.require || ["fixtures/**/*.def.ts"]).map(i => path.join(baseDir, i))),
    requireModule: ["ts-node/register/transpile-only", "tsconfig-paths/register"],
    strict: false,
    tags: overrides?.tags || process.env.TAGS,
    worldParameters: overrides?.worldParameters || {}
  };

  // assign the whole thing to world parameters so these can be accessible from cucumber's world context
  const { worldParameters, ...rest } = config;
  config.worldParameters = { config: { ...rest, ...custom }, ...worldParameters };

  return config;
}
