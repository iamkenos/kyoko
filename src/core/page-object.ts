import type { World } from "./world";
import type { Page } from "@commands/page/types";

export class PageObject {
  readonly page: Page;
  readonly world: World;
  url: string;
  title: string;

  constructor(world: World) {
    this.world = world;
    this.page = world.page;
  }
}
