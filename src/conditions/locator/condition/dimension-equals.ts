import { LocatorCondition } from "@conditions/locator/locator-condition";

export class DimensionEquals extends LocatorCondition {
  constructor(width: number, height: number, preferred?: boolean) {
    super(preferred);
    this.expected = this.toString(width, height);
  }

  private toString(width: number, height: number) {
    return `${width}px x ${height}px`;
  }

  async evaluate() {
    try {
      const box = await this.locator.boundingBox();
      const width = Math.round(box.width * 100) / 100;
      const height = Math.round(box.height * 100) / 100;
      this.actual = this.toString(width, height);
      this.passed = this.actual === this.expected;
    } catch (e) {
      this.actual = e.message;
    }

    return super.evaluate();
  }
}
