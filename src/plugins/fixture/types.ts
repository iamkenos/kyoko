import type { IContext as Context } from "./context/context.fixture";

declare global {
  var ctx: Context & { config: Context["config"] };
}
