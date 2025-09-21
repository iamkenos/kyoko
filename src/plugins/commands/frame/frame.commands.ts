import type { component } from "../page/command/component";

export interface IFrameCommands {
  component<T>(...args: Parameters<typeof component<T>>): ReturnType<typeof component<T>>;
}
