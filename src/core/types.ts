import type { Config } from "@config/types";
import type { This as World } from "./world";

declare global {
  var world: World & { config: Config };
}
