import { isURL } from "@common/utils/string";

import type { Page } from "@commands/page/types";

/** asdf asdfa sdf asdf asdf asd */
export function urlFromBase(this: Page, path: string) {
  const withBaseURL = this.context().config.baseURL + path;
  const fullURL = isURL(withBaseURL);
  const pageURL = isURL(path);
  const url = [pageURL, fullURL].find(Boolean);

  if (url) {
    return url;
  } else {
    new Error(`None of the resolved URLs are valid:\n  ${[withBaseURL, path].join(",\n  ")}`);
  }
}
