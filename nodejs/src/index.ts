import { object, func, Directory } from "@dagger.io/dagger";

import { Bun } from "./bun";
import { Npm } from "./npm";

@object()
class NodeJS {
  protected readonly directory: Directory;

  constructor(directory: Directory) {
    this.directory = directory;
  }

  @func()
  bun(version: string = "latest"): Bun {
    return new Bun(this.directory, version);
  }

  @func()
  npm(version: string = "latest"): Npm {
    return new Npm(this.directory, version);
  }
}
