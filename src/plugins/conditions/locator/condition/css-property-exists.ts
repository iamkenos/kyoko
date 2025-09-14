import { LocatorCondition } from "@plugins/conditions/locator/locator-condition";

import type { ExpectedConditionKwargs } from "@plugins/conditions/types";

export class CssPropertyExists extends LocatorCondition {
  constructor(property: string, kwargs: ExpectedConditionKwargs) {
    super(kwargs);
    this.expected = true;
    this.kwargs.property = property;
  }

  async evaluate() {
    try {
      const style: Object = await this.locator.evaluate((node: HTMLElement) => getComputedStyle(node));
      this.actual = !!Object.values(style).find(i => i === this.kwargs.property);
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
