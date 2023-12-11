import { Then, When } from "@cucumber/cucumber";
import { Modal } from "./modal.component";

import type { This } from "../pages/the-internet.def";

When(
  /^I close the modal component$/,
  async function(this: This) {
    await this.page.component(Modal).footer.click();
  }
);

Then(
  /^I expect the modal component body text to( not)? be:$/,
  async function(this: This, not: boolean, text: string) {
    await this.page.component(Modal).body.expect().textEquals(text, !not).poll();
  }
);

Then(
  /^I expect the modal component to( not)? be displayed$/,
  async function(this: This, not?: boolean) {
    await this.page.component(Modal).expect().displayed(!not).poll();
  }
);
