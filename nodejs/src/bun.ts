import { Directory } from "@dagger.io/dagger";
import { PackageManager } from "./packageManager";

export class Bun extends PackageManager {
  constructor(directory: Directory, version: string = "latest") {
    super(directory, {
      executable: "bun",
      image: "oven/bun",
      version,
    });
  }
}
