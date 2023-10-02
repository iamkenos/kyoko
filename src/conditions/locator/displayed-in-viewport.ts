import { ExpectedCondition } from "@conditions/expected-condition";

export class DisplayedInViewport extends ExpectedCondition {
  public constructor(preferred?: boolean) {
    super(preferred);
    this.expected = true;
  }

  async evaluate() {
    /** see https://stackoverflow.com/a/68848306 */
    this.actual = await this.locator.page().$eval((this.locator as any)._selector, async element => {
      const visibleRatio: number = await new Promise(resolve => {
        const observer = new IntersectionObserver(entries => {
          resolve(entries[0].intersectionRatio);
          observer.disconnect();
        });
        observer.observe(element);
        requestAnimationFrame(() => {});
      });
      return visibleRatio > 0;
    });
    this.passed = this.actual === this.expected;

    return super.evaluate();
  }
}
