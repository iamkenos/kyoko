import { Then, When } from "@cucumber/cucumber";
import { Modal } from "./modal.component";

import type { This } from "../pages/the-internet.steps";

When(
  "I close the modal component",
  async function(this: This) {
    await this.page.component(Modal).close();
  }
);

Then(
  "I expect the modal component text {to_or_to_not} be:",
  async function(this: This, not: boolean, text: string) {
    await this.page.component(Modal).expect().textEquals(text, { not }).poll();
  }
);

Then(
  "I expect the modal component {to_or_to_not} be displayed",
  async function(this: This, not: boolean) {
    await this.page.component(Modal).expect().displayed({ not }).poll();
  }
);
