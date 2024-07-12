import * as path from "path";

import type { Page } from "@fixtures/page/types";

export async function downloadFile(this: Page, trigger: (() => Promise<void>), ext: string) {
  let filename: string, filepath: string;

  try {
    const event = this.waitForEvent("download");
    await trigger();

    const download = await event;
    const downloadPath = await download.path();

    const { downloadsDir } = world.config;
    filename = path.basename(downloadPath) + `.${ext}`;
    filepath = path.join(downloadsDir, filename);

    await download.saveAs(filepath);
  } catch (e) {
    throw new Error(`Unable to download file: ${e}`);
  }

  await this.expect().fileExists(filepath).poll();
  return { filename, filepath };
}
