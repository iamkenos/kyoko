import * as path from "path";

import type { Locator } from "@commands/locator/types";

export async function uploadFiles(this: Locator, ...files: string[]) {
  const fileChooserPromise = this.page().waitForEvent("filechooser");
  await this.click();

  const fileChooser = await fileChooserPromise;
  const mapped = files.length > 0 ? files.map(file => path.join(this.page().context().config.baseDir, file)) : files;
  await fileChooser.setFiles(mapped);
}

