import { object, func, Directory } from "@dagger.io/dagger";
import { PackageManager } from "./packageManager";

@object()
class NodeJS {
  protected readonly manager: PackageManager;
  protected readonly directory: Directory;

  constructor(directory: Directory, manager: PackageManager) {
    this.manager = manager;
    this.directory = directory;
  }

  @func()
  async install() {
    return (await this.manager.setup()).withExec(["install"]);
  }
}
