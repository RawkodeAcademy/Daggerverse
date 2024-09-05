import { object, func, Directory } from "@dagger.io/dagger";
import { Bun } from "./bun";
import { Npm } from "./npm";

@object()
class nodejs {
  @func()
  bun(directory: Directory, version: string): Bun {
    return new Bun(directory, version);
  }

  @func()
  npm(directory: Directory, version: string): Npm {
    return new Npm(directory, version);
  }
}
