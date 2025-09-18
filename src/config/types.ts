import type { IConfiguration } from "@cucumber/cucumber/lib/configuration";
import type { BrowserContextOptions, LaunchOptions, Locator } from "playwright";

export type ContextParameters = { [key: string]: any };

export interface Config extends IConfiguration {
  /** Custom: The base directory where most config paths will be resolved from */
  baseDir: string;
  baseURL: string;
  browserOptions: Partial<{
    instance: "chromium" | "firefox" | "webkit";
    launchArgs: Omit<LaunchOptions, "headless">;
    browserContextArgs: Omit<BrowserContextOptions, "baseURL">;
    headless: boolean;
    /** Custom: Whether to attach a video on test failure. If false, attach a full page screenshot instead. Defaults to true  */
    recordVideo: boolean;
  }>;
  /** Custom: Whether to run in debug mode or not */
  debug: boolean;
  /** Custom: Directory to store browser downloads in, relative to the config file */
  downloadsDir: string;
  /** Custom: The active locale. Used as primary context for reading page object classes */
  locale: string;
  /** Custom: Level of logging verbosity */
  logLevel: "trace" | "debug" | "info" | "warn" | "error" | "silent";
  /** Custom: Array of globs pointing to your page object files, relative to the config file */
  pages: string[];
  /** Custom: Directory to store the snapshots in, relative to the config file */
  snapshotsDir: string;
  /** Custom: Object containing properties of comparable files */
  snapshots: Snapshots;
  timeout: number;
  worldParameters: ContextParameters
  formatOptions: IConfiguration["formatOptions"] & { environmentInfo?: { [key: string]: string } }
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
  readonly outDir?: string;
  /** Skip comparison, just save the actual files */
  skipCompare?: boolean;
} & SnapshotDirectories;

type ImageSnapshotOptions = {
  /** The pixel difference tolerance level when comparing image snapshots */
  maxDiffPixelRatio?: number;
  /** Array of locators to mask every time image comaprison is performed */
  mask?: Locator[];
} & SnapshotOptions;

export type LocatorSnapshotOptions = ImageSnapshotOptions;

export type PageSnapshotOptions = {
  /** Whether to take a snapshot of the entire page (not just the viewport) when doing image comparison */
  fullPage?: boolean
} & ImageSnapshotOptions;

type Snapshots = {
  /** Options used for comparing images */
  images?: ImageSnapshotOptions;
};
