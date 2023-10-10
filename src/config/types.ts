import type { IConfiguration } from "@cucumber/cucumber/lib/configuration";
import type { BrowserContextOptions, LaunchOptions } from "@playwright/test";
import type { Locator } from "@commands/locator/types";

export interface Config extends Omit<IConfiguration, "worldParameters"> {
  /** Custom: The base directory where most config paths will be resolved from */
  baseDir: string;
  baseURL: string;
  browser: string;
  browserOptions: Omit<LaunchOptions, "headless">;
  contextOptions: Omit<BrowserContextOptions, "baseURL">;
  /** Custom: Whether to run in debug mode or not */
  debug: boolean;
  /** Custom: Directory to store browser downloads in, relative to the config file */
  downloadsDir: string;
  headless: boolean;
  /** Custom: Array of globs pointing to your page object files, relative to the config file */
  pages: string[];
  /** Custom: Directory to store the reports in, relative to the config file */
  resultsDir: string;
  /** Custom: Object containing properties of comparable files */
  snapshots: Snapshots;
  timeout: number;
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
} & SnapshotOptions

export type LocatorSnapshotOptions = ImageSnapshotOptions;

export type PageSnapshotOptions = { fullPage?: boolean } & ImageSnapshotOptions;

type Snapshots = {
  /** Options used for comparing images */
  images?: ImageSnapshotOptions;
};
