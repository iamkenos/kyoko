import * as path from "path";

import type { Page } from "@fixtures/page/types";

export async function downloadFile(this: Page, trigger: (() => Promise<void>), newFilename?: string) {
  let filename: string, filepath: string;

  try {
    const { downloadsDir } = world.config;
    const event = this.waitForEvent("download");
    await trigger();

    const download = await event;
    filename = newFilename || download.suggestedFilename();
    filepath = path.join(downloadsDir, filename);

    await download.saveAs(filepath);
  } catch (e) {
    throw new Error(`Unable to download file: ${e}`);
  }

  await this.expect().fileExists(filepath).poll();
  return { filename, filepath };
}

export type DownloadFileCommand = (...args: Parameters<typeof downloadFile>) => ReturnType<typeof downloadFile>;
