import { object } from "@dagger.io/dagger";
import { PackageManager } from "./packageManager";

@object()
export class Bun extends PackageManager {
  protected image = "oven/bun";
  protected executable = "bun";
}
