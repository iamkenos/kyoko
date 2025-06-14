import "playwright";

import type { customCommandOne } from "./plugins/context/commands/customCommandOne";
import type { customCommandTwo } from "./plugins/page/commands/customCommandTwo";
import type { customCommandThree } from "./plugins/locator/commands/customCommandThree";

declare module "playwright" {

  interface BrowserContext {
    customCommandOne(...args: Parameters<typeof customCommandOne>): ReturnType<typeof customCommandOne>;
  }

  interface Page {
    customCommandTwo(...args: Parameters<typeof customCommandTwo>): ReturnType<typeof customCommandTwo>;
  }

  interface Locator {
    customCommandThree(...args: Parameters<typeof customCommandThree>): ReturnType<typeof customCommandThree>;
  }
}
