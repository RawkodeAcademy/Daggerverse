import { PackageManager } from "./packageManager";

export class Bun extends PackageManager {
  protected image = "oven/bun";
  protected executable = "bun";
}
