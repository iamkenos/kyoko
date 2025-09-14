import type { Config } from "@config/types";
import type { This as World } from "./world";

declare global {
  var ctx: World & { config: Config };
}
