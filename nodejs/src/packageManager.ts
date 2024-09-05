import {
  dag,
  func,
  Container,
  Directory,
  CacheSharingMode,
} from "@dagger.io/dagger";

interface PackageManagerConfig {
  image: string;
  version: string;
  executable: string;
}

export abstract class PackageManager {
  protected readonly config: PackageManagerConfig;
  protected readonly directory: Directory;

  constructor(directory: Directory, config: PackageManagerConfig) {
    this.directory = directory;
    this.config = config;
  }

  protected async getCacheName(): Promise<string> {
    const packageJson = this.directory.file("package.json");
    return `${
      JSON.parse(await packageJson.contents()).name as string
    }-bun-modules`;
  }

  protected async setup(): Promise<Container> {
    const cacheVolumeName = await this.getCacheName();
    return dag
      .container()
      .from(`${this.config.image}:${this.config.version}`)
      .withMountedDirectory("/code", this.directory)
      .withWorkdir("/code")
      .withMountedCache("/node_modules", dag.cacheVolume(cacheVolumeName), {
        sharing: CacheSharingMode.Shared,
      });
  }

  @func()
  public async install(): Promise<Container> {
    return (await this.setup()).withExec([this.config.executable, "install"]);
  }
}
