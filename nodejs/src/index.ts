import { object, func, Directory } from "@dagger.io/dagger";
import { Bun } from "./bun";

@object()
class nodejs {
  @func()
  bun(directory: Directory, version: string): Bun {
    return new Bun(directory, version);
  }
}
