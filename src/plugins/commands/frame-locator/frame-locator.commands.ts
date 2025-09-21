import type { component } from "../locator/command/component";

export interface IFrameLocatorCommands {
  component<T>(...args: Parameters<typeof component<T>>): ReturnType<typeof component<T>>;
}
