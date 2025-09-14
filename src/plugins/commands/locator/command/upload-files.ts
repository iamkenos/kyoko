import * as path from "path";

import type { Locator } from "playwright";

export async function uploadFiles(this: Locator, ...files: string[]) {
  const fileChooserPromise = this.page().waitForEvent("filechooser");
  await this.click();

  const fileChooser = await fileChooserPromise;
  const mapped = files.length > 0 ? files.map(file => path.isAbsolute(file) ? file : path.join(ctx.config.baseDir, file)) : files;
  await fileChooser.setFiles(mapped);
}
