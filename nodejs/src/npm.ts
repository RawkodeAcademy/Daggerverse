import { object } from "@dagger.io/dagger";
import { PackageManager } from "./packageManager";

@object()
export class Npm extends PackageManager {
  protected image = "node";
  protected executable = "npm";
}
