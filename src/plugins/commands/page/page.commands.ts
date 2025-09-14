import { CommandsPlugin } from "@plugins/commands/commands";

import type { Page } from "playwright";
import type { component } from "./command/component";
import type { dialogListener } from "./command/dialog-listener";
import type { downloadFile } from "./command/download-file";
import type { expect } from "./command/expect";
import type { handleDialog } from "./command/handle-dialog";
import type { requestsInterceptor } from "./command/requests-interceptor";
import type { resolvedUrlFrom } from "./command/resolved-url-from";
import type { scrollToBottom } from "./command/scroll-to-bottom";
import type { scrollToTop } from "./command/scroll-to-top";
import type { scrollTo } from "./command/scroll-to";
import type { switchToFrame } from "./command/switch-to-frame";
import type { waitUntil } from "./command/wait-until";

export class PageCommands extends CommandsPlugin {
  constructor(opts = {}) {
    super(opts);
  }

  async onPageCreated(target: Page) {
    this.applyOnPageAndFrames(target, (target: Page) => this.addCommandsTo(target));
  }
}

export interface IPageCommands {
  dialog: { handled: boolean, message: string };
  component<T>(...args: Parameters<typeof component<T>>): ReturnType<typeof component<T>>;
  dialogListener(...args: Parameters<typeof dialogListener>): ReturnType<typeof dialogListener>;
  downloadFile(...args: Parameters<typeof downloadFile>): ReturnType<typeof downloadFile>;
  expect(...args: Parameters<typeof expect>): ReturnType<typeof expect>;
  handleDialog(...args: Parameters<typeof handleDialog>): ReturnType<typeof handleDialog>;
  requestsInterceptor(...args: Parameters<typeof requestsInterceptor>): ReturnType<typeof requestsInterceptor>;
  scrollToBottom(...args: Parameters<typeof scrollToBottom>): ReturnType<typeof scrollToBottom>;
  scrollToTop(...args: Parameters<typeof scrollToTop>): ReturnType<typeof scrollToTop>;
  scrollTo(...args: Parameters<typeof scrollTo>): ReturnType<typeof scrollTo>;
  switchToFrame(...args: Parameters<typeof switchToFrame>): ReturnType<typeof switchToFrame>;
  /**
   * Returns the resolved url from a given `path` and the current `baseURL` if defined.
   *
   * The method will throw an error if:
   * - the resolved URL is malformed.
   *
   * @param path the path to resolve the full URL from.
   */
  resolvedUrlFrom(...args: Parameters<typeof resolvedUrlFrom>): ReturnType<typeof resolvedUrlFrom>;
  waitUntil(...args: Parameters<typeof waitUntil>): ReturnType<typeof waitUntil>;
}
