import type { Dialog } from "@playwright/test";
import type { Page } from "@fixtures/page/types";

export function dialogListener(
  this: Page,
  options: { action?: "accept" | "dismiss"; once?: boolean; text?: string } = {
    action: "dismiss",
    once: true,
    text: undefined
  }
) {
  const fnArg = options.text === null ? undefined : options.text;
  const listener = (dialog: Dialog) => {
    this.dialog = { handled: true, message: dialog.message() };
    dialog[options.action](fnArg);
  };
  this.dialog = { handled: false, message: undefined };
  options.once ? this.once("dialog", listener) : this.on("dialog", listener);
}
