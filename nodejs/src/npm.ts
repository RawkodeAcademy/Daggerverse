import { object, Directory } from "@dagger.io/dagger";
import { PackageManager } from "./packageManager";

@object()
export class Npm extends PackageManager {
  constructor(directory: Directory, version: string = "latest") {
    super(directory, {
      executable: "npm",
      image: "node",
      version,
    });
  }
}
