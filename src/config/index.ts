import * as fs from "fs-extra";
import * as path from "path";
import * as os from "node:os";

import callsites from "callsites";
import dotenv from "@dotenvx/dotenvx";

import type { Config as BaseConfig } from "./types";
import type { NestedOmit } from "../utils/types";

export * from "./types";

type Config = NestedOmit<BaseConfig, "snapshots.images.outDir">;

function loadEnv(baseDir: string) {
  const { NODE_ENV: CTX_ENV } = process.env;
  const envFile = CTX_ENV ? path.join(baseDir, `.env.${CTX_ENV}`) : path.join(baseDir, ".env");

  if (fs.existsSync(envFile)) {
    dotenv.config({ path: envFile });
  }
}

function getConfigBaseURL(overrides: Partial<Config>) {
  const { CTX_BASE_URL = "" } = process.env;
  const { baseURL = "" } = overrides;
  return CTX_BASE_URL ? CTX_BASE_URL : baseURL;
}

function getConfigBrowserOptions(overrides: Partial<Config>) {
  const { resultsDir } = getCukesFormatOptions(overrides);
  const {
    CTX_BROWSER_INSTANCE = "",
    CTX_BROWSER_IS_HEADLESS = "",
    CTX_BROWSER_RECORD_VIDEO = ""
  } = process.env;
  const baseURL = getConfigBaseURL(overrides);
  const supportedBrowsers = ["chromium", "firefox", "webkit"];
  const instance = supportedBrowsers.includes(CTX_BROWSER_INSTANCE.toLowerCase())
    ? CTX_BROWSER_INSTANCE.toLowerCase()
    : supportedBrowsers.includes((overrides.browserOptions?.instance ?? "").toLowerCase())
      ? (overrides.browserOptions.instance).toLowerCase()
      : supportedBrowsers[0];
  const headless = CTX_BROWSER_IS_HEADLESS
    ? CTX_BROWSER_IS_HEADLESS.toLowerCase() === "true"
    : overrides.browserOptions?.headless ?? false;
  const recordVideo = CTX_BROWSER_RECORD_VIDEO
    ? CTX_BROWSER_RECORD_VIDEO.toLowerCase() === "true"
    : overrides.browserOptions?.recordVideo ?? false;
  const videosDir = path.join(resultsDir, "videos");
  const launchArgs = {
    headless,
    ...overrides.browserOptions?.launchArgs
  };
  const browserContextArgs = {
    baseURL, ignoreHTTPSErrors: false,
    viewport: { width: 1675, height: 1020 },
    recordVideo: recordVideo ? { dir: videosDir } : undefined,
    ...overrides.browserOptions?.browserContextArgs
  };

  return { instance, headless, recordVideo, launchArgs, browserContextArgs };
}

function getConfigDebug(overrides: Partial<Config>) {
  const { CTX_DEBUG = "" } = process.env;
  const { debug = false } = overrides;
  return CTX_DEBUG ? CTX_DEBUG.toLowerCase() === "true" : debug;
}

function getConfigDownloadsDir(overrides: Partial<Config>) {
  const { CTX_DOWNLOADS_DIR = "" } = process.env;
  const { downloadsDir = "downloads/", baseDir } = overrides;
  const directory = path.join(baseDir, CTX_DOWNLOADS_DIR ? CTX_DOWNLOADS_DIR : downloadsDir);
  fs.removeSync(directory);
  return directory;
}

function getConfigLocale(overrides: Partial<Config>) {
  const { CTX_LOCALE = "" } = process.env;
  const { locale } = overrides;
  return CTX_LOCALE ? CTX_LOCALE : locale;
}

function getConfigLogLevel(overrides: Partial<Config>) {
  const { CTX_LOG_LEVEL = "" } = process.env;
  const { logLevel = "info" } = overrides;
  const debug = getConfigDebug(overrides);
  process.env.CTX_LOG_LEVEL = debug ? "debug" : CTX_LOG_LEVEL ? CTX_LOG_LEVEL : logLevel;
  return process.env.CTX_LOG_LEVEL;
}

function getConfigPages(overrides: Partial<Config>) {
  const { pages = ["fixtures/pages/**/*.page{,.*}.ts"], baseDir } = overrides;
  return pages.map(i => path.join(baseDir, i));
}

function getConfigSnapshotsDir(overrides: Partial<Config>) {
  const { CTX_SNAPSHOTS_DIR } = process.env;
  const { snapshotsDir = "snapshots/", baseDir } = overrides;
  return path.join(baseDir, CTX_SNAPSHOTS_DIR ? CTX_SNAPSHOTS_DIR : snapshotsDir);
}

function getConfigTimeout(overrides: Partial<Config>) {
  const { CTX_TIMEOUT } = process.env;
  const { timeout = 30000 } = overrides;
  return +CTX_TIMEOUT ? +CTX_TIMEOUT : timeout;
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

function getAllureDir(resultsDir: string) {
  return path.join(resultsDir, "allure");
}

function getCukesFormat(overrides: Partial<Config>) {
  const { baseDir } = overrides;
  const { format = [] } = overrides;
  const { resultsDir: allureResultsDir } = getCukesFormatOptions(overrides);
  const [baseResultsDir] = path.relative(baseDir, allureResultsDir).split(path.sep);
  const resultsDir = path.join(baseDir, baseResultsDir);
  fs.removeSync(resultsDir);

  return [
    "summary",
    `"html":"${path.join(resultsDir, "report.html")}"`,
    `"json":"${path.join(resultsDir, "report.json")}"`,
    `"allure-cucumberjs/reporter":"${path.join(allureResultsDir, "_")}"`,
    ...format
  ];
}

function getCukesFormatOptions(overrides: Partial<Config>) {
  const { baseDir } = overrides;
  const { formatOptions = {} }: any = overrides;
  const { resultsDir: baseResultsDir = "results/", environmentInfo, ...rest } = formatOptions ;
  const resultsDir = path.join(baseDir, baseResultsDir);
  const allureDir = getAllureDir(resultsDir);

  return {
    snippetInterface: "async-await",
    printAttachments: false,
    resultsDir: allureDir,
    environmentInfo: {
      "OS": os.platform(),
      "OS Version": os.version(),
      "Node Version": process.version,
      ...environmentInfo
    },
    ...rest
  };
}

function getCukesParallel(overrides: Partial<Config>) {
  const { CTX_PARALLEL_WORKERS } = process.env;
  const { parallel = 0 } = overrides;
  const debug = getConfigDebug(overrides);
  return debug ? 0 : CTX_PARALLEL_WORKERS ? +CTX_PARALLEL_WORKERS : parallel;
}

function getCukesPaths(overrides: Partial<Config>) {
  const { CTX_FEATURE_PATHS } = process.env;
  const { paths = ["features/"], baseDir } = overrides;
  return CTX_FEATURE_PATHS ? [CTX_FEATURE_PATHS].filter(Boolean) : paths.map(i => path.join(baseDir, i));
}

function getCukesRequire(overrides: Partial<Config>) {
  const { require = ["fixtures/**/*.{steps,glue}.ts"], baseDir } = overrides;
  return [
    path.join(__dirname, "../plugins/gherkin/hooks.js"),
    path.join(__dirname, "../plugins/gherkin/parameters.js"),
    path.join(__dirname, "../plugins/gherkin/**/*.{steps,glue}.js")
  ].concat(require.map(i => path.join(baseDir, i)));
}

function getCukesRequireModule() {
  return ["ts-node/register/transpile-only", "tsconfig-paths/register"];
}

function getCukesTags(overrides: Partial<Config>) {
  const { CTX_FEATURE_TAGS } = process.env;
  const { tags } = overrides;
  return CTX_FEATURE_TAGS ? CTX_FEATURE_TAGS : tags;
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

  // custom options defaults and overrides
  overrides.baseDir = baseDir;
  const baseURL = getConfigBaseURL(overrides);
  const debug = getConfigDebug(overrides);
  const downloadsDir = getConfigDownloadsDir(overrides);
  const locale = getConfigLocale(overrides);
  const logLevel = getConfigLogLevel(overrides);
  const pages = getConfigPages(overrides);
  const timeout = getConfigTimeout(overrides);
  const browserOptions = getConfigBrowserOptions(overrides);
  const snapshots = getConfigSnapshots(overrides);
  const custom = {
    baseDir, baseURL, browserOptions,
    debug, downloadsDir, locale, logLevel, pages, snapshots, timeout
  };

  // cucumber options defaults
  const config = {
    ...overrides,
    format: getCukesFormat(overrides),
    formatOptions: getCukesFormatOptions(overrides),
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
  globalThis.ctx = { config: config.worldParameters.config } as any;

  return config;
}
