import {
  dag,
  func,
  Container,
  Directory,
  CacheSharingMode,
} from "@dagger.io/dagger";

export abstract class PackageManager {
  protected readonly version: string;
  protected readonly directory: Directory;
  protected abstract image: string;
  protected abstract executable: string;

  constructor(directory: Directory, version: string) {
    this.directory = directory;
    this.version = version;
  }

  protected async getCacheName(): Promise<string> {
    const packageJson = this.directory.file("package.json");
    return `${
      JSON.parse(await packageJson.contents()).name as string
    }-bun-modules`;
  }

  public async setup(): Promise<Container> {
    const cacheVolumeName = await this.getCacheName();

    return dag
      .container()
      .from(`${this.image}:${this.version}`)
      .withMountedDirectory("/code", this.directory)
      .withWorkdir("/code")
      .withMountedCache("/node_modules", dag.cacheVolume(cacheVolumeName), {
        sharing: CacheSharingMode.Shared,
      })
      .withEntrypoint([this.executable]);
  }

  @func()
  async install(): Promise<Container> {
    return (await this.setup()).withExec(["install"]);
  }
}
