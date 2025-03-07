import { isURL } from "@common/utils/string";

import type { Page } from "@fixtures/page/types";

export function urlFromBase(this: Page, path: string) {
  const withBaseURL = world.config.baseURL + path;
  const fullURL = isURL(withBaseURL);
  const pageURL = isURL(path);
  const url = [pageURL, fullURL].find(Boolean);

  if (url) {
    return url;
  } else {
    new Error(`Unable to resolve a valid URL from:\n  ${[withBaseURL, path].join(",\n  ")}`);
  }
}

export type UrlFromBaseCommand = typeof urlFromBase;
