import type { Config } from "@config/types";
import type { IContext as Context } from "./context/context.fixture";

declare global {
  var ctx: Context & { config: Config };
}
