import { PackageManager } from "./packageManager";

export class Npm extends PackageManager {
  protected image = "node";
  protected executable = "npm";
}
