import type { Dialog, Page } from "playwright";

export function handleDialog(
  this: Page,
  options: { action?: "accept" | "dismiss"; once?: boolean; } = {
    action: "dismiss",
    once: true
  },
  ...args: any[]) {
  const handler = (dialog: Dialog) => {
    this.dialog = { handled: true, message: dialog.message() };
    dialog[options.action](...args);
  };
  this.dialog = { handled: false, message: undefined };
  options.once ? this.once("dialog", handler) : this.on("dialog", handler);
}
