import { object, func, Directory } from "@dagger.io/dagger";
import { PackageManager } from "./packageManager";

@object()
class NodeJS {
  @func()
  withPackageManager<T extends PackageManager>(
    type: new (directory: Directory, version: string) => T,
    directory: Directory,
    version: string
  ): T {
    return new type(directory, version);
  }
}
