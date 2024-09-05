import { object, Directory } from "@dagger.io/dagger";
import { PackageManager } from "./packageManager";

@object()
export class Bun extends PackageManager {
  constructor(directory: Directory, version: string = "latest") {
    super(directory, {
      executable: "bun",
      image: "oven/bun",
      version,
    });
  }
}
