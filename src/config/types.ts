import type { IConfiguration } from "@cucumber/cucumber/lib/configuration";
import type { BrowserContextOptions, LaunchOptions } from "@playwright/test";
import type { Locator } from "@fixtures/locator/types";

export type WorldParameters = { [key: string]: any };

export interface Config extends Omit<IConfiguration, "publish" | "publishQuiet"> {
  /** Custom: The base directory where most config paths will be resolved from */
  baseDir: string;
  baseURL: string;
  browser: "chromium" | "firefox" | "webkit" ;
  browserOptions: Omit<LaunchOptions, "headless">;
  contextOptions: Omit<BrowserContextOptions, "baseURL">;
  /** Custom: Whether to run in debug mode or not */
  debug: boolean;
  /** Custom: Directory to store browser downloads in, relative to the config file */
  downloadsDir: string;
  headless: boolean;
  /** Custom: The active locale. Used as primary context for reading page object classes */
  locale: string;
  /** Custom: Level of logging verbosity */
  logLevel: "trace" | "debug" | "info" | "warn" | "error" | "silent";
  /** Custom: Array of globs pointing to your page object files, relative to the config file */
  pages: string[];
  /** Custom: Directory to store the reports in, relative to the config file */
  resultsDir: string;
  /** Custom: Directory to store the snapshots in, relative to the config file */
  snapshotsDir: string;
  /** Custom: Object containing properties of comparable files */
  snapshots: Snapshots;
  timeout: number;
  worldParameters: WorldParameters
}

type SnapshotDirectories = {
  /** Directory under `outDir` where actual files are stored for comparison */
  actualDir?: string;
  /** Directory under `outDir` where expected files are stored for comparison */
  expectedDir?: string;
  /** Directory under `outDir` where differences are stored for comparison */
  diffDir?: string;
};

type SnapshotOptions = {
  /** Directory to store the output of this comparable object in, relative to the config file */
  outDir?: string;
  /** Skip comparison, just save the actual files */
  skipCompare?: boolean;
} & SnapshotDirectories;

type ImageSnapshotOptions = {
  maxDiffPixelRatio?: number;
  mask?: Locator[];
} & SnapshotOptions;

export type LocatorSnapshotOptions = ImageSnapshotOptions;

export type PageSnapshotOptions = { fullPage?: boolean } & ImageSnapshotOptions;

type Snapshots = {
  /** Options used for comparing images */
  images?: ImageSnapshotOptions;
};
