import {
  dag,
  object,
  func,
  Directory,
  Container,
  CacheSharingMode,
} from "@dagger.io/dagger";

// I tried to make this fancy, but we ran into some problems
// with Dagger.
// Revisit this when:
//   - https://github.com/dagger/dagger/issues/8343
//   - https://github.com/dagger/dagger/issues/8344

@object()
class nodejs {
  private readonly directory: Directory;

  @func()
  async withBun(
    directory: Directory,
    version: string = "latest"
  ): Promise<Container> {
    // const packageJson = this.directory.file("package.json");
    // const cacheVolumeName = `${
    //   JSON.parse(await packageJson.contents()).name as string
    // }-bun-modules`;

    return (
      dag
        .container()
        .from(`oven/bun:${version}`)
        // .withMountedCache("/node_modules", dag.cacheVolume(cacheVolumeName), {
        //   sharing: CacheSharingMode.Shared,
        // })
        .withEntrypoint(["bun"])
        .withMountedDirectory("/code", directory)
        .withWorkdir("/code")
    );
  }

  @func()
  async withNPM(
    directory: Directory,
    version: string = "latest"
  ): Promise<Container> {
    // const packageJson = this.directory.file("package.json");
    // const cacheVolumeName = `${
    //   JSON.parse(await packageJson.contents()).name as string
    // }-npm-modules`;

    return (
      dag
        .container()
        .from(`node:${version}`)
        // .withMountedCache("/node_modules", dag.cacheVolume(cacheVolumeName), {
        //   sharing: CacheSharingMode.Shared,
        // })
        .withEntrypoint(["npm"])
        .withMountedDirectory("/code", directory)
        .withWorkdir("/code")
    );
  }
}
