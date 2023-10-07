import type { IConfiguration } from "@cucumber/cucumber/lib/configuration";
import type { Locator } from "@commands/locator/types";

export interface Config extends Omit<IConfiguration, "worldParameters"> {
  baseDir: string;
  baseURL: string;
  browser: string;
  debug: boolean;
  headless: boolean;
  pages: string[];
  resultsDir: string;
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
