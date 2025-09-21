import { defineParameterType, Then, When } from "@cucumber/cucumber";
import { Modal } from "./modal.component";

import type { Context } from "../pages/the-internet.steps";

defineParameterType({
  name: "modal_component",
  regexp: /modal component/,
  transformer(this: Context) { return this.page.component(Modal); }
});

When(
  "I close the {modal_component}",
  async function(this: Context, component: Modal) {
    await component.close();
  }
);

Then(
  "I expect the {modal_component} text {to_or_to_not} be:",
  async function(this: Context, component: Modal, not: boolean, text: string) {
    await component.expect().textEquals(text, { not }).poll();
  }
);

Then(
  "I expect the {modal_component} {to_or_to_not} be displayed",
  async function(this: Context, component: Modal, not: boolean) {
    await component.expect().displayed({ not }).poll();
  }
);
