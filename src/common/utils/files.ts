import * as glob from "glob";
import * as path from "path";

export function fromGlob(globs: string[], isStrict = false): string[] {
  const resolved = new Set<string>();

  globs.filter(Boolean).forEach((i: string): void => {
    const files: string[] = glob.sync(i);

    if (files.length === 0) {
      console.warn("No matches found for glob %s", i);
    } else {
      files.forEach((i) => resolved.add(path.resolve(i)));
    }
  });

  if (resolved.size === 0 && isStrict) {
    throw new Error("Unable to resolve any existing file from the given paths. See warnings.");
  }

  return [...resolved];
}
